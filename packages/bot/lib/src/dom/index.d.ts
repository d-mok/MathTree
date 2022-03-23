import { HTMLWorker } from "./worker";
export declare class QuestionHTML extends HTMLWorker {
    get li(): HTMLLIElement[];
    get ul(): HTMLUListElement;
    cloneLi(sourceIndex: number, repeat?: number): void;
    isLiDuplicated(): boolean;
    shuffleLi2(): number[];
}
//# sourceMappingURL=index.d.ts.map