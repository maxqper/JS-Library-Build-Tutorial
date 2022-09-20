"use strict";

var _moduleone = require("moduleone");

var _moduletwo = require("moduletwo");

var out1 = new _moduleone.ClassOne().methodOne();
console.log("This is an app example where module One API is accessed with node import/export. Results: === " + out1 + "\n");
var out2 = new _moduletwo.ClassTwo().methodTwo();
console.log("This is a node example where module TWO API is accessed with node import/export. Results: === " + out2 + "\n");
//# sourceMappingURL=index.js.map