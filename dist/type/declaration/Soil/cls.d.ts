export declare class Config {
    sections: section[];
    answer: string;
    options: Partial<Dict>;
    constructor(sections?: section[], answer?: string, options?: Partial<Dict>);
}
export declare class Dict {
    a: any;
    b: any;
    c: any;
    d: any;
    e: any;
    f: any;
    g: any;
    h: any;
    i: any;
    j: any;
    k: any;
    l: any;
    m: any;
    n: any;
    o: any;
    p: any;
    q: any;
    r: any;
    s: any;
    t: any;
    u: any;
    v: any;
    w: any;
    x: any;
    y: any;
    z: any;
    A: any;
    B: any;
    C: any;
    D: any;
    E: any;
    F: any;
    G: any;
    H: any;
    I: any;
    J: any;
    K: any;
    L: any;
    M: any;
    N: any;
    O: any;
    P: any;
    Q: any;
    R: any;
    S: any;
    T: any;
    U: any;
    V: any;
    W: any;
    X: any;
    Y: any;
    Z: any;
    private variables;
    constructor(a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any, i?: any, j?: any, k?: any, l?: any, m?: any, n?: any, o?: any, p?: any, q?: any, r?: any, s?: any, t?: any, u?: any, v?: any, w?: any, x?: any, y?: any, z?: any, A?: any, B?: any, C?: any, D?: any, E?: any, F?: any, G?: any, H?: any, I?: any, J?: any, K?: any, L?: any, M?: any, N?: any, O?: any, P?: any, Q?: any, R?: any, S?: any, T?: any, U?: any, V?: any, W?: any, X?: any, Y?: any, Z?: any);
    update(other: Partial<Dict>): void;
    checked(): boolean;
    substitute(text: string): string;
}