const END_TAG = String.raw `(?=[^<>]*</span>)`;
const SPACES = String.raw `(?:\s|&nbsp;)*`;
export class Dressor {
    constructor(html) {
        this.html = html;
    }
    do(reg, replace, inTag = false) {
        let tail = inTag ? END_TAG : '';
        let regex = new RegExp(reg.join(SPACES) + tail, 'g');
        this.html = this.html.replaceAll(regex, replace);
    }
    get() {
        return this.html;
    }
}
//# sourceMappingURL=dressor.js.map