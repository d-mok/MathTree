import { shuffleAs } from '../coshuffle'


type Tag = keyof HTMLElementTagNameMap



export class HTMLWorker {
    protected body: HTMLBodyElement

    constructor(html: string = '') {
        this.body = (new DOMParser())
            .parseFromString(html, 'text/html')
            .getElementsByTagName('body')[0]
    }

    /** Get all elements by tag name. */
    protected all<K extends Tag>(tag: K): HTMLElementTagNameMap[K][] {
        return [...this.body.getElementsByTagName(tag)]
    }

    /** Get one element. */
    protected one<K extends Tag>(tag: K, index: number = 0): HTMLElementTagNameMap[K] {
        return this.all(tag)[index]
    }


    /** Get all children of an element. */
    protected childrenOf(tag: Tag, index: number = 0): Element[] {
        return [...this.one(tag, index).children]
    }


    /** Get a clone of an element. */
    protected clone(tag: Tag, index: number = 0): Node {
        return this.one(tag, index).cloneNode(true)
    }

    /** Check if the elements have duplicates. */
    protected hasDuplicate(tag: Tag): boolean {
        let htmls: string[] = this.all(tag).map($ => $.innerHTML.replaceAll(' ', ''))
        return (new Set(htmls)).size !== htmls.length
    }


    /** Shuffle in-place the children of an element. */
    protected shuffleChildren(indexArr: number[], tag: Tag, index: number = 0): number[] {
        let children = this.childrenOf(tag, index)
        let htmls = children.map($ => $.innerHTML)
        htmls = shuffleAs(htmls, indexArr)
        for (let i = 0; i < children.length; i++)
            children[i].innerHTML = htmls[i]
        return indexArr
    }


    /** Get the body tag's innerHTML */
    export(): string {
        return this.body.innerHTML
    }

    /** Transform innerHTML of an element. */
    protected tranformInnerHTML(fn: ($: string) => string, tag: Tag, index: number = 0) {
        let ele = this.one(tag, index)
        ele.innerHTML = fn(ele.innerHTML)
    }

}

