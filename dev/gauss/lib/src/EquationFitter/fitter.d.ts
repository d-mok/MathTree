export declare class Fitter {
    private readonly fs;
    private readonly ranges;
    private readonly preset;
    private readonly allVariables;
    private vals;
    constructor(fs: zeroFunction[], ranges: rangeObj, preset: valObj);
    private reset;
    private setVals;
    private fitOne;
    /**
     * Try to fit the system by fitting the equations one by one in a fittable order.
     * To avoid accidental range conflict, 10 retries are allowed.
     */
    fit(): valObj;
}
//# sourceMappingURL=fitter.d.ts.map