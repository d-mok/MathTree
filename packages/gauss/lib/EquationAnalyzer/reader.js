"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readTree = exports.solvingSymbol = exports.solutionFlow = void 0;
const utils_1 = require("../utils");
class TreeReader {
    constructor(tree) {
        this.tree = tree;
        this.symbols = Object.keys(tree);
        this.orders = Object.values(this.tree);
        this.realOrders = this.orders.filter($ => Number.isFinite($));
        this.maxOrder = Math.max(...this.realOrders);
    }
    symbolsWithOrder(order) {
        return this.symbols.filter($ => this.tree[$] === order);
    }
    givenSymbols() {
        return this.symbolsWithOrder(0);
    }
    topSymbols() {
        return this.symbolsWithOrder(this.maxOrder);
    }
    stepSymbols() {
        const arr = [];
        for (let i = 1; i < this.maxOrder; i++) {
            arr.push(...this.symbolsWithOrder(i));
        }
        return arr;
    }
    solvedSymbols() {
        return [...this.stepSymbols(), ...this.topSymbols()];
    }
}
class EquationReader {
    constructor(f, tree) {
        this.f = f;
        this.tree = tree;
        this.myTree = {};
        this.symbols = (0, utils_1.getVars)(f);
        for (let k in tree) {
            if (this.symbols.includes(k))
                this.myTree[k] = tree[k];
        }
        this.reader = new TreeReader(this.myTree);
    }
    /**
     * Is this equation actively solved, or passively satisfied?
     */
    isActiveSolve() {
        const m = this.maxOrder();
        return m !== 0 && this.symbolsWithOrder(m).length === 1;
    }
    maxOrder() {
        return this.reader.maxOrder;
    }
    symbolsWithOrder(order) {
        return this.symbols.filter($ => this.tree[$] === order);
    }
    /**
     * Which symbol is solved using this equation?
     */
    solvingSymbol() {
        if (!this.isActiveSolve())
            return undefined;
        return this.reader.topSymbols()[0];
    }
    /**
     * Which symbols are given in this equation?
     */
    givenSymbols() {
        return this.reader.givenSymbols();
    }
    /**
     * Which symbols are the steps when solving this equation?
     */
    stepSymbols() {
        return this.reader.stepSymbols();
    }
}
class Tracer {
    constructor(tree, eqReaders) {
        this.tree = tree;
        this.eqReaders = eqReaders;
        this.symbols = Object.keys(this.tree);
    }
    /**
     * Which equation is used solve this symbol in the final step?
     */
    revealer(symbol) {
        for (let eq of this.eqReaders) {
            if (eq.solvingSymbol() === symbol)
                return eq;
        }
        return undefined;
    }
    /**
     * In the revealer of this symbol, what symbols are the step symbols?
     */
    prerequisites(symbol) {
        return this.revealer(symbol)?.stepSymbols() ?? [];
    }
    /**
     * Get the ordered list of equation in the sequential step when solving for this symbol.
     */
    flowForOne(symbol) {
        const order = this.tree[symbol];
        if (order === 0)
            return [];
        if (order === 1)
            return [this.revealer(symbol)];
        let eqs = [];
        for (let s of this.prerequisites(symbol)) {
            eqs.push(...this.flowForOne(s));
        }
        eqs.push(this.revealer(symbol));
        return [...new Set(eqs)];
    }
    /**
     * Get the ordered list of equation in the sequential step when solving for these symbols.
     */
    flow(unknowns) {
        let eqs = [];
        for (let u of unknowns) {
            eqs.push(...this.flowForOne(u));
        }
        return [...new Set(eqs)];
    }
}
/**
 * Get the ordered list of function in the sequential step when solving for these symbols under the given tree.
 */
function solutionFlow(fs, tree, unknownSymbols) {
    const eqReaders = fs.map($ => new EquationReader($, tree));
    const tracer = new Tracer(tree, eqReaders);
    let flow = tracer.flow(unknownSymbols);
    return flow.map($ => $.f);
}
exports.solutionFlow = solutionFlow;
/**
 * Which symbol is solved using this function under the given tree?
 */
function solvingSymbol(f, tree) {
    const eqReader = new EquationReader(f, tree);
    return eqReader.solvingSymbol();
}
exports.solvingSymbol = solvingSymbol;
/**
 * Read basic info of a tree.
 */
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
exports.readTree = readTree;
//# sourceMappingURL=reader.js.map