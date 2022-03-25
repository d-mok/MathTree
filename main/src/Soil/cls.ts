import { blacksmith } from './tool/blacksmith'







export class Config {
    constructor(
        public answer: string = "A",
        public options: Partial<Dict> = {},
        public shuffle: boolean = true
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

export class Dict {

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


    private used(): { [_: string]: string } {
        let obj: { [_: string]: string } = {}
        for (let key of variables) {
            let val = this[key]
            if (typeof val === 'symbol') continue
            obj[key] = val
        }
        return obj
    }

    // update(other: Partial<Dict>): void {
    //     for (let key of variables) {
    //         if (key in other) this[key] = other[key]
    //     }
    // }

    private undefs(): { [_: string]: any }[] {
        let undefs: { [_: string]: any }[] = []
        for (let key of variables) {
            let v = this[key]
            if (
                v === undefined ||
                // v === null ||
                (typeof v === 'number' && !Number.isFinite(v))
            ) undefs.push({ key: v })
        }
        return undefs
    }

    undefsJSON(): string {
        return JSON.stringify(this.undefs())
    }

    checked(): boolean {
        return this.undefs().length === 0
    }

    substitute(text: string): string {
        return blacksmith.quickForge(text, this.used())


        // for (let key of variables) {
        //     let num = this[key]
        //     if (typeof num === 'symbol') continue
        //     text = blacksmith.forge(text, key, num)
        // }
        // return text
    }
}

