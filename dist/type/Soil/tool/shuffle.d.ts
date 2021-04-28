export declare class OptionShuffler {
    private qn;
    private sol;
    private ans;
    private perm;
    private valid;
    private Qn;
    constructor(qn: string, sol: string, ans: string);
    AreOptionsDuplicated(): boolean;
    genQn(): string;
    private mapLetter;
    genAns(): string;
    genSol(): string;
}
