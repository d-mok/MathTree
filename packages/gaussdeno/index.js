function getVars(func) {
    const fnStr = func.toString();
    return fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).replaceAll(" ", "").split(",");
}
function getAllVars(fs) {
    const vars = fs.map(($)=>getVars($)
    ).flat();
    return [
        ...new Set(vars)
    ];
}
function permute(arr) {
    let result = [];
    if (arr.length === 0) return [];
    if (arr.length === 1) return [
        arr
    ];
    for(let i = 0; i < arr.length; i++){
        const current = arr[i];
        const remaining = [
            ...arr.slice(0, i),
            ...arr.slice(i + 1)
        ];
        const remainingPermuted = permute(remaining);
        for (let permuted of remainingPermuted){
            result.push([
                current,
                ...permuted
            ]);
        }
    }
    return result;
}
function combinations(arr, k) {
    if (k > arr.length || k <= 0) return [];
    if (k === arr.length) return [
        [
            ...arr
        ]
    ];
    if (k === 1) return arr.map(($)=>[
            $
        ]
    );
    const combs = [];
    let tail_combs = [];
    for(let i = 0; i <= arr.length - k + 1; i++){
        let tail = arr.slice(i + 1);
        tail_combs = combinations(tail, k - 1);
        for(let j = 0; j < tail_combs.length; j++){
            combs.push([
                arr[i],
                ...tail_combs[j]
            ]);
        }
    }
    return combs;
}
function randomUniform(range) {
    const [min, max] = range;
    return Math.random() * (max - min) + min;
}
function randomLog(range) {
    const [min, max] = range;
    const logmin = Math.log10(min);
    const logmax = Math.log10(max);
    const e = randomUniform([
        logmin,
        logmax
    ]);
    return 10 ** e;
}
function randomLogNeg(range) {
    const [minNeg, maxNeg] = range;
    const min = -maxNeg;
    const max = -minNeg;
    return -randomLog([
        min,
        max
    ]);
}
function randomValue(range) {
    let [min, max] = range;
    if (min > 0 && max > 0) return randomLog(range);
    if (min < 0 && max < 0) return randomLogNeg(range);
    return randomUniform(range);
}
function mid(a, b) {
    return a.map(($, i)=>($ + b[i]) / 2
    );
}
function equal(a, b) {
    return a.every(($, i)=>$ === b[i]
    ) && a.length === b.length;
}
class Bisection {
    equation;
    ranges;
    a = [];
    b = [];
    precision = 10;
    constructor(equation, ranges){
        this.equation = equation;
        this.ranges = ranges;
    }
    randomPoint() {
        return this.ranges.map(randomValue);
    }
    randomSignedPoint(sign) {
        for(let i = 0; i < 100; i++){
            const point = this.randomPoint();
            const value = this.equation(...point);
            const sameSign = value * sign > 0;
            if (sameSign) return point;
        }
        console.error("[bisection] No signed point in ranges: " + JSON.stringify(this.ranges));
        throw '';
    }
    intialize() {
        this.a = this.randomSignedPoint(1);
        this.b = this.randomSignedPoint(-1);
    }
    iterate() {
        const m = mid(this.a, this.b);
        const M = this.equation(...m);
        if (!Number.isFinite(M)) {
            console.error('[bisection] The function value is not a finite number!');
            throw '';
        }
        if (M >= 0) this.a = m;
        if (M <= 0) this.b = m;
    }
    done() {
        const precision_a = this.a.map(($)=>$.toPrecision(this.precision)
        );
        const precision_b = this.b.map(($)=>$.toPrecision(this.precision)
        );
        return equal(precision_a, precision_b);
    }
    assertRange() {
        const pass = this.ranges.some(([min, max])=>max > min
        );
        if (!pass) {
            console.error('[bisection] all variables are locked already');
            throw '';
        }
    }
    run() {
        this.assertRange();
        this.intialize();
        for(let i = 0; i < 100; i++){
            this.iterate();
            if (this.done()) return [
                ...this.a
            ];
        }
        console.error('[bisection] fail to find tolarable solution after 100 iteration');
        throw '';
    }
    exec() {
        try {
            return this.run();
        } catch  {
            throw '[bisection] An error occur during bisection.';
        }
    }
}
function toObject(keys, vals) {
    const obj = {
    };
    for(let i = 0; i < keys.length; i++){
        obj[keys[i]] = vals[i];
    }
    return obj;
}
function narrowRange(ranges, preset) {
    const rngs = {
        ...ranges
    };
    for(let k in preset){
        const val = preset[k];
        if (k in rngs && Number.isFinite(val)) rngs[k] = [
            val,
            val
        ];
    }
    return rngs;
}
function bisect(f, ranges, preset) {
    const vars = getVars(f);
    const narrowedRngs = narrowRange(ranges, preset);
    const bounds = vars.map(($)=>narrowedRngs[$]
    );
    const bi = new Bisection(f, bounds);
    const sol = bi.exec();
    return toObject(vars, sol);
}
class Searcher {
    fs;
    givens;
    founds = new Set();
    constructor(fs, givens = []){
        this.fs = fs;
        this.givens = givens;
    }
    reset() {
        this.founds = new Set(this.givens);
    }
    isFull(f) {
        return getVars(f).every(($)=>this.founds.has($)
        );
    }
    fit(f) {
        getVars(f).forEach(($)=>this.founds.add($)
        );
    }
    isFittableOrder(fs) {
        this.reset();
        for (let f of fs){
            if (this.isFull(f)) return false;
            this.fit(f);
        }
        return true;
    }
    getFittableOrder() {
        for (let fs of permute(this.fs)){
            if (this.isFittableOrder(fs)) return fs;
        }
        return undefined;
    }
}
function getFittableOrder(fs, preset) {
    const givens = [];
    for(let k in preset){
        let v = preset[k];
        if (Number.isFinite(v)) givens.push(k);
    }
    const sr = new Searcher(fs, givens);
    return sr.getFittableOrder();
}
class Fitter {
    fs;
    ranges;
    preset;
    allVariables;
    vals = {
    };
    constructor(fs, ranges, preset){
        this.fs = fs;
        this.ranges = ranges;
        this.preset = preset;
        this.allVariables = getAllVars(fs);
        this.reset();
    }
    reset() {
        this.vals = {
        };
        this.allVariables.forEach(($)=>this.vals[$] = NaN
        );
        this.setVals(this.preset);
    }
    setVals(vals) {
        this.vals = {
            ...this.vals,
            ...vals
        };
    }
    fitOne(f) {
        const sol = bisect(f, this.ranges, this.vals);
        this.setVals(sol);
    }
    fit() {
        const orderedFS = getFittableOrder(this.fs, this.preset);
        if (orderedFS === undefined) throw 'There is no fittable order for this system.';
        for(let i = 0; i < 10; i++){
            try {
                this.reset();
                orderedFS.forEach(($)=>this.fitOne($)
                );
                return this.vals;
            } catch  {
            }
        }
        throw 'The system is not fittable in given range.';
    }
}
function fit(fs, ranges, preset) {
    let fitter = new Fitter(fs, ranges, preset);
    return fitter.fit();
}
class Vabe {
    symbol;
    order = NaN;
    constructor(symbol){
        this.symbol = symbol;
    }
    reset() {
        this.order = NaN;
    }
    setZero() {
        this.order = 0;
    }
    solve(order) {
        this.order = order;
    }
    solved() {
        return Number.isFinite(this.order);
    }
}
class Eqube {
    vabes;
    constructor(vabes){
        this.vabes = vabes;
    }
    unsolvedVabes() {
        return this.vabes.filter(($)=>!$.solved()
        );
    }
    solved() {
        return this.unsolvedVabes().length === 0;
    }
    solvable() {
        return this.unsolvedVabes().length === 1;
    }
    orders() {
        return this.vabes.map(($)=>$.order
        );
    }
    realOrders() {
        return this.orders().filter(($)=>Number.isFinite($)
        );
    }
    maxOrder() {
        const orders = this.realOrders();
        if (orders.length === 0) return -1;
        return Math.max(...orders);
    }
    nextOrder() {
        return this.maxOrder() + 1;
    }
    forceSolve() {
        let nextOrder = this.nextOrder();
        for (let v of this.unsolvedVabes()){
            v.solve(nextOrder);
        }
    }
    trySolve() {
        if (this.solvable()) {
            this.forceSolve();
            return true;
        } else {
            return false;
        }
    }
}
class PresetAnalyzer {
    vabes;
    equbes;
    preset;
    constructor(vabes, equbes, preset){
        this.vabes = vabes;
        this.equbes = equbes;
        this.preset = preset;
    }
    reset() {
        for (let v of this.vabes){
            const isPreset = this.preset.includes(v);
            isPreset ? v.setZero() : v.reset();
        }
    }
    trySolveNext() {
        for (let eq of this.equbes){
            const t = eq.trySolve();
            if (t === true) return true;
        }
        return false;
    }
    exportOrder() {
        const orders = {
        };
        for (let v of this.vabes){
            orders[v.symbol] = v.order;
        }
        return orders;
    }
    getTree() {
        this.reset();
        for(let i = 0; i <= this.equbes.length; i++){
            const t = this.trySolveNext();
            if (!t) break;
        }
        return this.exportOrder();
    }
}
class Analyzer {
    vabes;
    equbes;
    constructor(vabes, equbes){
        this.vabes = vabes;
        this.equbes = equbes;
    }
    allVabeCombinations() {
        const n = this.vabes.length - this.equbes.length;
        return combinations(this.vabes, n);
    }
    getTrees() {
        const combs = this.allVabeCombinations();
        const ts = [];
        for (let c of combs){
            const ana = new PresetAnalyzer(this.vabes, this.equbes, c);
            ts.push(ana.getTree());
        }
        return ts;
    }
    isHealthy(tree) {
        const orders = Object.values(tree);
        return orders.every(($)=>Number.isFinite($)
        );
    }
    getHealthyTrees() {
        return this.getTrees().filter(($)=>this.isHealthy($)
        );
    }
}
function analyze(fs) {
    const symbols = getAllVars(fs);
    const vabes = symbols.map(($)=>new Vabe($)
    );
    const equbes = [];
    for (let f of fs){
        let syms = getVars(f);
        const vs = syms.map(($)=>vabes.find((_)=>_.symbol === $
            )
        );
        let eq = new Eqube(vs);
        equbes.push(eq);
    }
    let analyzer = new Analyzer(vabes, equbes);
    return analyzer.getHealthyTrees();
}
class TreeReader {
    tree;
    symbols;
    orders;
    realOrders;
    maxOrder;
    constructor(tree){
        this.tree = tree;
        this.symbols = Object.keys(tree);
        this.orders = Object.values(this.tree);
        this.realOrders = this.orders.filter(($)=>Number.isFinite($)
        );
        this.maxOrder = Math.max(...this.realOrders);
    }
    symbolsWithOrder(order) {
        return this.symbols.filter(($)=>this.tree[$] === order
        );
    }
    givenSymbols() {
        return this.symbolsWithOrder(0);
    }
    topSymbols() {
        return this.symbolsWithOrder(this.maxOrder);
    }
    stepSymbols() {
        const arr = [];
        for(let i = 1; i < this.maxOrder; i++){
            arr.push(...this.symbolsWithOrder(i));
        }
        return arr;
    }
    solvedSymbols() {
        return [
            ...this.stepSymbols(),
            ...this.topSymbols()
        ];
    }
}
class EquationReader {
    f;
    tree;
    symbols;
    myTree = {
    };
    reader;
    constructor(f, tree){
        this.f = f;
        this.tree = tree;
        this.symbols = getVars(f);
        for(let k in tree){
            if (this.symbols.includes(k)) this.myTree[k] = tree[k];
        }
        this.reader = new TreeReader(this.myTree);
    }
    isActiveSolve() {
        const m = this.maxOrder();
        return m !== 0 && this.symbolsWithOrder(m).length === 1;
    }
    maxOrder() {
        return this.reader.maxOrder;
    }
    symbolsWithOrder(order) {
        return this.symbols.filter(($)=>this.tree[$] === order
        );
    }
    solvingSymbol() {
        if (!this.isActiveSolve()) return undefined;
        return this.reader.topSymbols()[0];
    }
    givenSymbols() {
        return this.reader.givenSymbols();
    }
    stepSymbols() {
        return this.reader.stepSymbols();
    }
}
class Tracer {
    tree;
    eqReaders;
    symbols;
    constructor(tree, eqReaders){
        this.tree = tree;
        this.eqReaders = eqReaders;
        this.symbols = Object.keys(this.tree);
    }
    revealer(symbol) {
        for (let eq of this.eqReaders){
            if (eq.solvingSymbol() === symbol) return eq;
        }
        return undefined;
    }
    prerequisites(symbol) {
        return this.revealer(symbol)?.stepSymbols() ?? [];
    }
    flowForOne(symbol) {
        const order = this.tree[symbol];
        if (order === 0) return [];
        if (order === 1) return [
            this.revealer(symbol)
        ];
        let eqs = [];
        for (let s of this.prerequisites(symbol)){
            eqs.push(...this.flowForOne(s));
        }
        eqs.push(this.revealer(symbol));
        return [
            ...new Set(eqs)
        ];
    }
    flow(unknowns) {
        let eqs = [];
        for (let u of unknowns){
            eqs.push(...this.flowForOne(u));
        }
        return [
            ...new Set(eqs)
        ];
    }
}
function solutionFlow(fs, tree, unknownSymbols) {
    const eqReaders = fs.map(($)=>new EquationReader($, tree)
    );
    const tracer = new Tracer(tree, eqReaders);
    let flow = tracer.flow(unknownSymbols);
    return flow.map(($)=>$.f
    );
}
function solvingSymbol(f, tree) {
    const eqReader = new EquationReader(f, tree);
    return eqReader.solvingSymbol();
}
function readTree(tree) {
    const reader = new TreeReader(tree);
    return {
        maxOrder: reader.maxOrder,
        givens: reader.givenSymbols(),
        tops: reader.topSymbols(),
        steps: reader.stepSymbols(),
        solved: reader.solvedSymbols()
    };
}
export { fit as fit };
export { analyze as analyze, solutionFlow as solutionFlow, solvingSymbol as solvingSymbol, readTree as readTree };
