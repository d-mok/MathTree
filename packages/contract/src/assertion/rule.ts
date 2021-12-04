
type ruleOne = (_: any) => boolean
type ruleAnd = ruleOne[]
type ruleObj = { [_: string]: ruleOne }
export type rule = ruleOne | ruleAnd | ruleObj


function nameOf(f: Function): string {
    return f.name ?? f.toString()
}


function matchOne(val: any, rule: ruleOne): true | string {
    return rule(val) ? true : nameOf(rule)
}

function matchAnd(val: any, rule: ruleAnd): true | string {
    for (let p of rule)
        if (!p(val)) return nameOf(p)
    return true
}

function matchObj(val: any, rule: ruleObj): true | string {
    for (let k in rule) {
        const has = k in val
        if (!has) return 'should have property: ' + k
        const p = rule[k]
        const pass = p(val[k])
        if (!pass) return k + ' -> ' + nameOf(p)
    }
    return true
}

function isOne(rule: rule): rule is ruleOne {
    return typeof rule === 'function'
}

function isAnd(rule: rule): rule is ruleAnd {
    return Array.isArray(rule)
}

function isObj(rule: rule): rule is ruleObj {
    return typeof rule === 'object' &&
        !Array.isArray(rule) &&
        rule !== null
}


export function matchRule(val: any, rule: rule): true | string {
    if (isOne(rule))
        return matchOne(val, rule)
    if (isAnd(rule))
        return matchAnd(val, rule)
    if (isObj(rule))
        return matchObj(val, rule)
    return 'fail to recognize the rule'
}

