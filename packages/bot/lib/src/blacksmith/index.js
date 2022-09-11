import { exprCtxHTML } from '../eval';
function escapeRegExp(text) {
    return text.replaceAll(/[.*+!?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
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
        if (typeof val === 'symbol')
            return undefined;
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
    reg(pattern, innerRegex) {
        let reg = escapeRegExp(pattern).replace('@', innerRegex);
        return new RegExp(reg, 'g');
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
    /** Replace all patterns like *A, **A, etc */
    forge(text, dict) {
        for (let p of this.forgePatterns) {
            let keys = Object.keys(dict);
            keys.sort(function (a, b) {
                return b.length - a.length;
            });
            let symbols = '(' + keys.join('|') + ')';
            text = text.replaceAll(this.reg(p, symbols), (match, p1) => this.transform(p, dict[p1]) ?? match);
        }
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
    /** Intrapolate js *{...js...} or *\\{...js...\\} */
    intraOne(text, pattern, context) {
        return text
            .replaceAll(this.reg(pattern, String.raw `\\\{([^\{\}]*)\\\}`), (match, code) => {
            let result = exprCtxHTML(code, context);
            return this.transform(pattern, result) ?? match;
        })
            .replaceAll(this.reg(pattern, String.raw `\{([^\{\}]*)\}`), (match, code) => {
            let result = exprCtxHTML(code, context);
            return this.transform(pattern, result) ?? match;
        });
    }
    /** Intrapolate js *{...js...} or *\\{...js...\\} */
    intra(text, context) {
        for (let p of this.intraPatterns)
            text = this.intraOne(text, p, context);
        return text;
    }
}
export class Blacksmith extends BlacksmithIntra {
}
//# sourceMappingURL=index.js.map