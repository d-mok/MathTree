export declare class QuestionHTML {
    private body;
    constructor(html?: string);
    export(): string;
    get li(): HTMLLIElement[];
    get ul(): HTMLUListElement;
    cloneLi(sourceIndex: number, repeat?: number): void;
    printInWhole(symbol: string, value: any): void;
    printInLi(index: number, symbol: string, value: any): void;
    isLiDuplicated(): boolean;
    shuffleLi(): number[];
}
/**
* print a variable (e.g. *x) into the html
* ```typescript
* let html = '1 + *x = *y'
* PrintVariable(html,'x',2) // '1 + 2 = *y'
* ```
*/
export declare function PrintVariable(html: string, symbol: string, value: any): string;
