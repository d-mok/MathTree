export declare class Soil {
    private readonly gene;
    private qn;
    private sol;
    private dict;
    private config;
    private counter;
    private errorPile;
    constructor(gene: Gene);
    private reset;
    private recordError;
    private evalCode;
    private pushDict;
    private isValidated;
    private katex;
    private runPopulate;
    private runSection;
    private runPreprocess;
    private runOption;
    private runSubstitute;
    private runPostprocess;
    private runShuffle;
    private runKatex;
    private successFruit;
    private errorFruit;
    nurture(): Fruit;
}
