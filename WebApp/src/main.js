import {Stuff} from './lib.js';
// import {Git} from './Git.js';
import {Github} from './Github.js';


(function main() {
    "use strict";
    //
    // let git = new Git(function(resultObject) {
    //
    //         console.log(resultObject);
    // });

    let github = new Github();

    let stuff = new Stuff();
    document.getElementById('result1').textContent = stuff.x;
    document.getElementById('result2').textContent = stuff.y;

})();
