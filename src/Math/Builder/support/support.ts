import { Equation } from './equation'
import { EquSystem } from './system'
import { Variable, Variables } from './variable'



function getSignature(func: Fun): string[] {
    const fnStr = func.toString()
    return fnStr
        .slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'))
        .replaceAll(" ", "")
        .split(",")
}

function findVarBySym(sym: string, vars: Variables): Variable {
    let v = vars.find(v => v.sym === sym)
    if (v === undefined) throw "Fail to find variable: " + sym
    return v
}

function getDeps(func: Fun, vars: Variables): Variables {
    let dep = getSignature(func)
    let vs = dep.map($ => findVarBySym($, vars))
    return new Variables(...vs)
}

function toVariable(variable: varInput): Variable {
    let [sym, name, range, unit, display] = variable
    return new Variable(sym, name, range, unit, display)
}

export function toVariables(vars: varInput[]): Variables {
    let vs = vars.map($ => toVariable($))
    return new Variables(...vs)
}

function toEquation(eq: equInput, vars: Variables): Equation {
    let [func, latex] = eq
    return new Equation(func, latex, getDeps(func, vars))
}

export function toEquations(eqs: equInput[], vars: Variables): Equation[] {
    return eqs.map($ => toEquation($, vars))
}

export function toEquSystem(variables: varInput[], equations: equInput[]): EquSystem {
    let vars = toVariables(variables)
    let eqs = toEquations(equations, vars)
    return new EquSystem(vars, eqs)
}


