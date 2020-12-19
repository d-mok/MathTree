type Shell = {
    content: SeedCore
    question?: Question
}



class SeedCore {
    constructor(
        public readonly qn: string = "",
        public readonly sol: string = "",
        public readonly populate: string = "",
        public readonly validate: string = "",
        public readonly preprocess: string = "",
        public readonly postprocess: string = "",
    ) { }
}


class Config {
    constructor(
        public sections: section[] = [],
        public answer: string = "A",
        public options: Partial<Dict> = {}
    ) { }
}

const variables: (keyof Dict)[] = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v',
    'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V',
    'W', 'X', 'Y', 'Z'
]

class Dict {
    constructor(
        public a: any = undefined,
        public b: any = undefined,
        public c: any = undefined,
        public d: any = undefined,
        public e: any = undefined,
        public f: any = undefined,
        public g: any = undefined,
        public h: any = undefined,
        public i: any = undefined,
        public j: any = undefined,
        public k: any = undefined,
        public l: any = undefined,
        public m: any = undefined,
        public n: any = undefined,
        public o: any = undefined,
        public p: any = undefined,
        public q: any = undefined,
        public r: any = undefined,
        public s: any = undefined,
        public t: any = undefined,
        public u: any = undefined,
        public v: any = undefined,
        public w: any = undefined,
        public x: any = undefined,
        public y: any = undefined,
        public z: any = undefined,
        public A: any = undefined,
        public B: any = undefined,
        public C: any = undefined,
        public D: any = undefined,
        public E: any = undefined,
        public F: any = undefined,
        public G: any = undefined,
        public H: any = undefined,
        public I: any = undefined,
        public J: any = undefined,
        public K: any = undefined,
        public L: any = undefined,
        public M: any = undefined,
        public N: any = undefined,
        public O: any = undefined,
        public P: any = undefined,
        public Q: any = undefined,
        public R: any = undefined,
        public S: any = undefined,
        public T: any = undefined,
        public U: any = undefined,
        public V: any = undefined,
        public W: any = undefined,
        public X: any = undefined,
        public Y: any = undefined,
        public Z: any = undefined,
    ) { }
    update(other: Partial<Dict>) {
        for (let key of variables) {
            if (key in other) this[key] = other[key]
        }
    }
    blur() {
        for (let key of variables) {
            this[key] = Blur(this[key])
        }
    }
    substitute(text: string): string {
        for (let key of variables) {
            let num = this[key]
            if (typeof num === 'undefined') continue;
            text = PrintVariable(text, key, num)
        }
        return text
    }
}





type section = [number | string, number]



type Question = {
    qn: string,
    sol: string,
    ans: string | undefined,
    counter: number,
    success: boolean
}


declare var AutoOptions: (
    dict: Partial<Dict>,
    question: string,
    source: Dict,
    validate: string
) => string


declare var PrintVariable: (html: string, symbol: string, value: any) => string


declare var Blur: (value: any, accuracy?: number) => (typeof value)