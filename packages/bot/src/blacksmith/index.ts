import { exprCtxHTML } from '../eval'

function escapeRegExp(text: string): string {
    return text.replaceAll(/[.*+!?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

class Stringifier<T> {

    constructor(
        public pattern: string,
        public checker: ($: any) => $ is T,
        public transformer: ($: T) => string
    ) { }

}



class BlacksmithBase {

    private sfrs: Stringifier<any>[] = []

    add<T>(pattern: string, checker: ($: any) => $ is T, transformer: ($: T) => string) {
        let s = new Stringifier<T>(pattern, checker, transformer)
        this.sfrs.push(s)
    }

    protected transform(pattern: string, val: unknown): string | undefined {
        if (typeof val === 'symbol')
            return undefined

        let ss = this.sfrs.filter($ => $.pattern === pattern)
        for (let s of ss) {
            if (s.checker(val))
                return s.transformer(val)
        }
        return String(val)
    }

    protected allPatterns(): string[] {
        let ps = this.sfrs.map(s => s.pattern)
        return [...new Set(ps)]
    }


}

export class BlacksmithForge extends BlacksmithBase {

    private forgePatterns: string[] = []

    /** Set patterns for forge. Default to all patterns. */
    setForgePatterns(patterns?: string[]) {
        this.forgePatterns = patterns ?? this.allPatterns()
    }

    // /** Replace specific pattern like *A */
    // private forgeOne(text: string, symbol: string, val: unknown, pattern: string): string {
    //     let pn = pattern.replaceAll('@', symbol)
    //     if (text.includes(pn)) {
    //         let content = this.transform(pattern, val)
    //         return text.replaceAll(pn, content)
    //     } else {
    //         return text
    //     }
    // }

    // /** Replace all patterns like *A, **A, etc */
    // forge(text: string, symbol: string, val: unknown): string {
    //     for (let p of this.forgePatterns)
    //         text = this.forgeOne(text, symbol, val, p)
    //     return text
    // }

    quickForge(text: string, dict: { [symbol: string]: any }): string {
        for (let p of this.forgePatterns) {
            let reg = escapeRegExp(p)
            let symbols = '(' + Object.keys(dict).join('|') + ')'
            reg = reg.replace('@', symbols)
            text = text.replaceAll(
                new RegExp(reg, 'g'),
                (match, p1) => this.transform(p, dict[p1]) ?? match)
        }
        return text
    }



}




class BlacksmithIntra extends BlacksmithForge {

    private intraPatterns: string[] = []


    /** Set patterns for intra. Default to all patterns. */
    setIntraPatterns(patterns?: string[]) {
        this.intraPatterns = patterns ?? this.allPatterns()
    }

    /** Intrapolate js *{...js...} or *\\{...js...\\} */
    private intraOne(text: string, pattern: string, context: object): string {
        let prefix = escapeRegExp(pattern.split('@')[0])
        text = text.replaceAll(
            new RegExp(String.raw`${prefix}\\\{([^\{\}]*)\\\}`, 'g'),
            (match, code) => {
                let result = exprCtxHTML(code, context)
                return this.transform(pattern, result) ?? match
            })
        text = text.replaceAll(
            new RegExp(String.raw`${prefix}\{([^\{\}]*)\}`, 'g'),
            (match, code) => {
                let result = exprCtxHTML(code, context)
                return this.transform(pattern, result) ?? match
            })
        return text
    }

    /** Intrapolate js *{...js...} or *\\{...js...\\} */
    intra(text: string, context: object): string {
        for (let p of this.intraPatterns)
            text = this.intraOne(text, p, context)
        return text
    }


}

export class Blacksmith extends BlacksmithIntra { }