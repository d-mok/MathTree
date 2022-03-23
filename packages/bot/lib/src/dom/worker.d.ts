declare type Tag = keyof HTMLElementTagNameMap;
export declare class HTMLWorker {
    protected body: HTMLBodyElement;
    constructor(html?: string);
    /** Get all elements by tag name. */
    protected all<K extends Tag>(tag: K): HTMLElementTagNameMap[K][];
    /** Get one element. */
    protected one<K extends Tag>(tag: K, index?: number): HTMLElementTagNameMap[K];
    /** Get all children of an element. */
    protected childrenOf(tag: Tag, index?: number): Element[];
    /** Get a clone of an element. */
    protected clone(tag: Tag, index?: number): Node;
    /** Check if the elements have duplicates. */
    protected hasDuplicate(tag: Tag): boolean;
    /** Shuffle in-place the children of an element. */
    protected shuffleChildren(tag: Tag, index?: number): number[];
    /** Get the body tag's innerHTML */
    export(): string;
    /** Transform innerHTML of an element. */
    protected tranformInnerHTML(fn: ($: string) => string, tag: Tag, index?: number): void;
}
export {};
//# sourceMappingURL=worker.d.ts.map