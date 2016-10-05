import {Stuff} from './lib.js';

(function main() {
    "use strict";

    let stuff = new Stuff();
    document.getElementById('result1').textContent = stuff.x;
    document.getElementById('result2').textContent = stuff.y;

})();
