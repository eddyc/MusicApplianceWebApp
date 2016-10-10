class Github {
    constructor() {

        var JSZip = require("jszip");
        var filer = new Filer();
        var url =  'http://github.com/eddyc/MusicApplianceRepository/archive/master.zip';
        var xhr = this.createCORSRequest('GET', url);

        if (!xhr) {

            throw new Error('CORS not supported');
        }

        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.responseType = 'blob';
        xhr.onload = function(e) {

            if (this.status == 200) {
                var myBlob = this.response;
                console.log(myBlob);

                var new_zip = new JSZip();
                new_zip.loadAsync(myBlob)
                .then(function(zip) {


                    filer.init({persistent: false, size: 1024 * 1024}, function(fs) {

                        let files = [];
                        let directories = [];

                        for (var fileString in zip.files) {

                            if (~fileString.indexOf(".")) {

                                files.push(fileString);
                            }
                            else {

                                directories.push(fileString);
                            }
                        }

                        for (let i = 0; i <  directories.length; ++i) {

                            filer.mkdir(directories[i], false, function(dirEntry) {

                            }) ;
                        }

                        for (let i = 0; i <  files.length; ++i) {

                            zip.file(files[i]).async("string")
                            .then(function success(content) {

                                filer.write(files[i], {data:content, type: 'text/plain'}, function(fileEntry, fileWriter) {

                                    if(fileEntry.name === 'index.html') {

                                        console.log(fileEntry);
                                        let iframe = document.getElementById("UIFrame");
                                        iframe.contentWindow.document.location.href = fileEntry.toURL();
                                    }
                                });
                            });
                        }

                        console.log("stuff");
                    });


                });
            }
        };
        xhr.send();
    }

    createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {

            xhr.open(method, url, true);

        } else if (typeof XDomainRequest != "undefined") {

            xhr = new XDomainRequest();
            xhr.open(method, url);

        } else {

            xhr = null;
        }
        return xhr;
    }
}

export {
    Github
};
