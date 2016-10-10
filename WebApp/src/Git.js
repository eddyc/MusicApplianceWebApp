
class Git {


    constructor(doneCallback) {

        let that = this;
        this.currentObject = {};

        var repo = {};
        var githubName = "eddyc/MusicApplianceRepository";
        var githubToken = "4b760eaa04ba76ac7810fc3e002440426e7f16c1";

        require("babel-polyfill");
        require("babel-core/register");
        require('js-github/mixins/github-db')(repo, githubName, githubToken);
        require('js-git/mixins/create-tree')(repo);
        require('js-git/mixins/mem-cache')(repo);
        require('js-git/mixins/read-combiner')(repo);
        require('js-git/mixins/formats')(repo);

        var run = require('gen-run');

        run(function* () {

            var headHash = yield repo.readRef("refs/heads/master");
            var commit = yield repo.loadAs("commit", headHash);
            var topLevel = yield repo.loadAs("tree", commit.tree);
            populateObject(topLevel, that.currentObject, true);


            function populateObject(currentRoot, resultObject, isTopLevel) {

                let stack = 0;

                for (var objects in currentRoot) {

                    let entry = currentRoot[objects];

                    if (typeof(entry) === 'undefined') {

                        continue;
                    }

                    if (entry.mode === 16384) {

                        repo.loadAs("tree", entry.hash, function(x, stuffT) {

                            resultObject[objects] = {}
                            console.log(resultObject);
                            populateObject(stuffT, resultObject[objects], false);
                            stack++;

                        });
                    }
                    else {

                        repo.loadAs("text", entry.hash, function(x, st) {

                            resultObject[objects] = st;
                        });
                    }
                }

            }
        });
        // run(function* () {
        //
        //     var headHash = yield repo.readRef("refs/heads/master");
        //     var commit = yield repo.loadAs("commit", headHash);
        //     var topLevel = yield repo.loadAs("tree", commit.tree);
        //     populateObject(topLevel, that.currentObject, true);
        //
        //
        //     function populateObject(currentRoot, resultObject, isTopLevel) {
        //
        //         let stack = 0;
        //         run(function* () {
        //
        //             for (var objects in currentRoot) {
        //
        //                 let entry = currentRoot[objects];
        //
        //                 if (typeof(entry) === 'undefined') {
        //
        //                     continue;
        //                 }
        //
        //                 if (entry.mode === 16384) {
        //
        //                     var stuffT = yield repo.loadAs("tree", entry.hash);
        //                     resultObject[objects] = {}
        //                     // console.log(resultObject);
        //                     populateObject(stuffT, resultObject[objects], false);
        //                     stack++;
        //                 }
        //                 else {
        //
        //                     var st = yield repo.loadAs("text", entry.hash);
        //                     resultObject[objects] = st;
        //                 }
        //             }
        //         });
        //
        //     }
        // });


    }

}

export {
    Git
};
