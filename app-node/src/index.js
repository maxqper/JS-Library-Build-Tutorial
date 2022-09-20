import {ClassOne} from 'moduleone';
import {ClassTwo} from 'moduletwo';

let out1 = new ClassOne().methodOne();
console.log("This is an app example where module One API is accessed with node import/export. Results: === " + out1 + "\n");

let out2 = new ClassTwo().methodTwo();
console.log("This is a node example where module TWO API is accessed with node import/export. Results: === " + out2 + "\n");
