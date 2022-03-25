import { shuffleAs } from '../coshuffle';
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
    shuffleChildren(indexArr, tag, index = 0) {
        let children = this.childrenOf(tag, index);
        let htmls = children.map($ => $.innerHTML);
        htmls = shuffleAs(htmls, indexArr);
        for (let i = 0; i < children.length; i++)
            children[i].innerHTML = htmls[i];
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
//# sourceMappingURL=index.js.map