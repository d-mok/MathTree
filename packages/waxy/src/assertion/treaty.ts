type anyFunc = (...args: any[]) => any
type treatyOne<F extends func = anyFunc> = (...args: Parameters<F>) => boolean
type treatyAnd<F extends func = anyFunc> = treatyOne<F>[]
export type treaty<F extends func = anyFunc> = treatyOne<F> | treatyAnd<F>


function nameOf(f: Function): string {
    return f.name ?? f.toString()
}

function matchOne(vals: any[], treaty: treatyOne): true | string {
    return treaty(...vals) ? true : nameOf(treaty)
}

function matchAnd(vals: any[], treaty: treatyAnd): true | string {
    for (let p of treaty)
        if (!p(...vals)) return nameOf(p)
    return true
}

function isOne(treaty: treaty): treaty is treatyOne {
    return typeof treaty === 'function'
}

function isAnd(treaty: treaty): treaty is treatyAnd {
    return Array.isArray(treaty)
}

export function matchTreaty(vals: any[], treaty: treaty): true | string {
    if (isOne(treaty))
        return matchOne(vals, treaty)
    if (isAnd(treaty))
        return matchAnd(vals, treaty)
    return 'fail to recognize the rule'
}
