import { exprCtxHTML } from '../eval';
class Stringifier {
    constructor(pattern, checker, transformer) {
        this.pattern = pattern;
        this.checker = checker;
        this.transformer = transformer;
    }
}
class BlacksmithBase {
    constructor() {
        this.sfrs = [];
    }
    add(pattern, checker, transformer) {
        let s = new Stringifier(pattern, checker, transformer);
        this.sfrs.push(s);
    }
    transform(pattern, val) {
        let ss = this.sfrs.filter($ => $.pattern === pattern);
        for (let s of ss) {
            if (s.checker(val))
                return s.transformer(val);
        }
        return String(val);
    }
    allPatterns() {
        let ps = this.sfrs.map(s => s.pattern);
        return [...new Set(ps)];
    }
}
export class BlacksmithForge extends BlacksmithBase {
    constructor() {
        super(...arguments);
        this.forgePatterns = [];
    }
    /** Set patterns for forge. Default to all patterns. */
    setForgePatterns(patterns) {
        this.forgePatterns = patterns ?? this.allPatterns();
    }
    /** replace specific pattern like *A */
    forgeOne(text, symbol, val, pattern) {
        let pn = pattern.replaceAll('@', symbol);
        if (text.includes(pn)) {
            let content = this.transform(pattern, val);
            return text.replaceAll(pn, content);
        }
        else {
            return text;
        }
    }
    /** replace all patterns like *A, **A, etc */
    forge(text, symbol, val) {
        for (let p of this.forgePatterns)
            text = this.forgeOne(text, symbol, val, p);
        return text;
    }
}
class BlacksmithIntra extends BlacksmithForge {
    constructor() {
        super(...arguments);
        this.intraPatterns = [];
    }
    /** Set patterns for intra. Default to all patterns. */
    setIntraPatterns(patterns) {
        this.intraPatterns = patterns ?? this.allPatterns();
    }
    /** intrapolate js *{...js...} or *\\{...js...\\} */
    intraOne(text, pattern, context) {
        let prefix = pattern.split('@')[0].split('').map($ => '\\' + $).join('');
        text = text.replaceAll(new RegExp(String.raw `${prefix}\\\{([^\{\}]*)\\\}`, 'g'), (match, code) => {
            let result = exprCtxHTML(code, context);
            return this.transform(pattern, result);
        });
        text = text.replaceAll(new RegExp(String.raw `${prefix}\{([^\{\}]*)\}`, 'g'), (match, code) => {
            let result = exprCtxHTML(code, context);
            return this.transform(pattern, result);
        });
        return text;
    }
    /** intrapolate js *{...js...} or *\\{...js...\\} */
    intra(text, context) {
        for (let p of this.intraPatterns)
            text = this.intraOne(text, p, context);
        return text;
    }
}
export class Blacksmith extends BlacksmithIntra {
}
//# sourceMappingURL=index.js.map