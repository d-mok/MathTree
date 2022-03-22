
type Tag = keyof HTMLElementTagNameMap


function range(count: number): number[] {
    return [...Array(count).keys()]
}

function shuffledArray<T>(arr: T[]): T[] {
    let a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

function shuffledIndex(count: number): number[] {
    return shuffledArray(range(count))
}



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
    protected shuffleChildren(tag: Tag, index: number = 0): number[] {
        let children = this.childrenOf(tag, index)
        let htmls = children.map($ => $.innerHTML)
        let indexArr = shuffledIndex(children.length)
        children.forEach((v, i) => {
            const j = indexArr[i]
            v.innerHTML = htmls[j]
        })
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

