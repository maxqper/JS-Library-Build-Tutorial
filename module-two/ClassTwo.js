import { ClassOne } from 'moduleone';

export default class ClassThree {
    constructor() {
        this.name = 'ClassTwo';
    }

    methodTwo() {
        return "ClassTwo::methodTwo which internally invokes " + new ClassOne().methodOne() ;
    }
}