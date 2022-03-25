import { PrintVariable } from "./tool/html"







export class Config {
    constructor(
        public answer: string = "A",
        public options: Partial<Dict> = {},
        public shuffle: boolean = true
    ) { }
}




export class Dict {
    private variables: (keyof Dict)[] = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o',
        'p', 'q', 'r', 's', 't', 'u', 'v',
        'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L', 'M', 'N', 'O',
        'P', 'Q', 'R', 'S', 'T', 'U', 'V',
        'W', 'X', 'Y', 'Z'
    ]
    constructor(
        public a: any = Symbol(),
        public b: any = Symbol(),
        public c: any = Symbol(),
        public d: any = Symbol(),
        public e: any = Symbol(),
        public f: any = Symbol(),
        public g: any = Symbol(),
        public h: any = Symbol(),
        public i: any = Symbol(),
        public j: any = Symbol(),
        public k: any = Symbol(),
        public l: any = Symbol(),
        public m: any = Symbol(),
        public n: any = Symbol(),
        public o: any = Symbol(),
        public p: any = Symbol(),
        public q: any = Symbol(),
        public r: any = Symbol(),
        public s: any = Symbol(),
        public t: any = Symbol(),
        public u: any = Symbol(),
        public v: any = Symbol(),
        public w: any = Symbol(),
        public x: any = Symbol(),
        public y: any = Symbol(),
        public z: any = Symbol(),
        public A: any = Symbol(),
        public B: any = Symbol(),
        public C: any = Symbol(),
        public D: any = Symbol(),
        public E: any = Symbol(),
        public F: any = Symbol(),
        public G: any = Symbol(),
        public H: any = Symbol(),
        public I: any = Symbol(),
        public J: any = Symbol(),
        public K: any = Symbol(),
        public L: any = Symbol(),
        public M: any = Symbol(),
        public N: any = Symbol(),
        public O: any = Symbol(),
        public P: any = Symbol(),
        public Q: any = Symbol(),
        public R: any = Symbol(),
        public S: any = Symbol(),
        public T: any = Symbol(),
        public U: any = Symbol(),
        public V: any = Symbol(),
        public W: any = Symbol(),
        public X: any = Symbol(),
        public Y: any = Symbol(),
        public Z: any = Symbol(),
    ) { }
    update(other: Partial<Dict>) {
        for (let key of this.variables) {
            if (key in other) this[key] = other[key]
        }
    }
    checked() {
        for (let key of this.variables) {
            let v = this[key]
            if (
                v === undefined ||
                // v === null ||
                (typeof v === 'number' && !Number.isFinite(v))
            ) return false
        }
        return true
    }
    substitute(text: string): string {
        for (let key of this.variables) {
            let num = this[key]
            if (typeof num === 'symbol') continue;
            text = PrintVariable(text, key, num)
        }
        return text
    }
}

