"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyze = void 0;
const utils_1 = require("../utils");
class Vabe {
    constructor(symbol) {
        this.symbol = symbol;
        this.order = NaN;
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
    constructor(vabes) {
        this.vabes = vabes;
    }
    unsolvedVabes() {
        return this.vabes.filter($ => !$.solved());
    }
    solved() {
        return this.unsolvedVabes().length === 0;
    }
    solvable() {
        return this.unsolvedVabes().length === 1;
    }
    orders() {
        return this.vabes.map($ => $.order);
    }
    realOrders() {
        return this.orders().filter($ => Number.isFinite($));
    }
    maxOrder() {
        const orders = this.realOrders();
        if (orders.length === 0)
            return -1;
        return Math.max(...orders);
    }
    nextOrder() {
        return this.maxOrder() + 1;
    }
    forceSolve() {
        let nextOrder = this.nextOrder();
        for (let v of this.unsolvedVabes()) {
            v.solve(nextOrder);
        }
    }
    trySolve() {
        if (this.solvable()) {
            this.forceSolve();
            return true;
        }
        else {
            return false;
        }
    }
}
class PresetAnalyzer {
    constructor(vabes, equbes, preset) {
        this.vabes = vabes;
        this.equbes = equbes;
        this.preset = preset;
    }
    reset() {
        for (let v of this.vabes) {
            const isPreset = this.preset.includes(v);
            isPreset ? v.setZero() : v.reset();
        }
    }
    trySolveNext() {
        for (let eq of this.equbes) {
            const t = eq.trySolve();
            if (t === true)
                return true;
        }
        return false;
    }
    exportOrder() {
        const orders = {};
        for (let v of this.vabes) {
            orders[v.symbol] = v.order;
        }
        return orders;
    }
    /**
     * Get the tree of the system under current preset.
     * The process is deterministic, so a unique tree should be obtained.
     * The tree may or may not be healthy, i.e. fully solved.
     */
    getTree() {
        this.reset();
        for (let i = 0; i <= this.equbes.length; i++) {
            const t = this.trySolveNext();
            if (!t)
                break;
        }
        return this.exportOrder();
    }
}
class Analyzer {
    constructor(vabes, equbes) {
        this.vabes = vabes;
        this.equbes = equbes;
    }
    allVabeCombinations() {
        const n = this.vabes.length - this.equbes.length;
        return (0, utils_1.combinations)(this.vabes, n);
    }
    getTrees() {
        const combs = this.allVabeCombinations();
        const ts = [];
        for (let c of combs) {
            const ana = new PresetAnalyzer(this.vabes, this.equbes, c);
            ts.push(ana.getTree());
        }
        return ts;
    }
    isHealthy(tree) {
        // return true
        const orders = Object.values(tree);
        return orders.every($ => Number.isFinite($));
    }
    /**
     * Get all the healthy trees generated from all possible 'given variables' combinations.
     */
    getHealthyTrees() {
        return this.getTrees().filter($ => this.isHealthy($));
    }
}
/**
 * Get all the healthy trees of this system generated from all possible 'given variables' combinations.
 */
function analyze(fs) {
    const symbols = (0, utils_1.getAllVars)(fs);
    const vabes = symbols.map($ => new Vabe($));
    const equbes = [];
    for (let f of fs) {
        let syms = (0, utils_1.getVars)(f);
        const vs = syms.map($ => vabes.find(_ => _.symbol === $));
        let eq = new Eqube(vs);
        equbes.push(eq);
    }
    let analyzer = new Analyzer(vabes, equbes);
    return analyzer.getHealthyTrees();
}
exports.analyze = analyze;
//# sourceMappingURL=analyze.js.map