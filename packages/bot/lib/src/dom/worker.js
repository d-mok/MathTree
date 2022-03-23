function range(count) {
    return [...Array(count).keys()];
}
function shuffledArray(arr) {
    let a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
function shuffledIndex(count) {
    return shuffledArray(range(count));
}
export class HTMLWorker {
    constructor(html = '') {
        this.body = (new DOMParser())
            .parseFromString(html, 'text/html')
            .getElementsByTagName('body')[0];
    }
    /** Get all elements by tag name. */
    all(tag) {
        return [...this.body.getElementsByTagName(tag)];
    }
    /** Get one element. */
    one(tag, index = 0) {
        return this.all(tag)[index];
    }
    /** Get all children of an element. */
    childrenOf(tag, index = 0) {
        return [...this.one(tag, index).children];
    }
    /** Get a clone of an element. */
    clone(tag, index = 0) {
        return this.one(tag, index).cloneNode(true);
    }
    /** Check if the elements have duplicates. */
    hasDuplicate(tag) {
        let htmls = this.all(tag).map($ => $.innerHTML.replaceAll(' ', ''));
        return (new Set(htmls)).size !== htmls.length;
    }
    /** Shuffle in-place the children of an element. */
    shuffleChildren(tag, index = 0) {
        let children = this.childrenOf(tag, index);
        let htmls = children.map($ => $.innerHTML);
        let indexArr = shuffledIndex(children.length);
        children.forEach((v, i) => {
            const j = indexArr[i];
            v.innerHTML = htmls[j];
        });
        return indexArr;
    }
    /** Get the body tag's innerHTML */
    export() {
        return this.body.innerHTML;
    }
    /** Transform innerHTML of an element. */
    tranformInnerHTML(fn, tag, index = 0) {
        let ele = this.one(tag, index);
        ele.innerHTML = fn(ele.innerHTML);
    }
}
//# sourceMappingURL=worker.js.map