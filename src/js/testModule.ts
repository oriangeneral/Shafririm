class AClass {
    private _test: string;

    constructor() {
        this._test = "Default value";
    }

    get test(): string {
        return this._test;
    }

    set test(test: string) {
        this._test = test;
    }

}

let valueZero = 0;
let valueOne = 1;
valueOne = 2; // not exported

export {AClass, valueZero};
