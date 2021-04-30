

function ArgBlood(fname: string, fargs: string, argIndex: number, argValue: any, predicate: predicate): Blood {
    let i = String(argIndex)
    let v = argValue.toString()
    let p = predicate.name || predicate.toString()
    return new Blood(
        'Contract',
        '(' + fname + ') arg(' + fargs + ')[' + i + '] = ' + v + ' violate: ' + p
    )
}


function ReturnBlood(fname: string, returnValue: any, predicate: predicate): Blood {
    let v = returnValue
    let p = predicate.name || predicate.toString()
    return new Blood(
        'Contract',
        '(' + fname + ') return = ' + v + ' violate: ' + p
    )
}


function CatchBlood(fname: string, e: Error): Blood {
    return new Blood(
        'Contract',
        '(' + fname + ') thrown ' + e.name + ' with message:\n' + e.message
    )
}



function toRule(source: predicate | rule): rule {
    return Array.isArray(source) ? source : [source]
}





function validateArgs<F extends Function>(f: F, rules: (predicate | rule)[], fname: string, fargs: string): F {
    let policy = rules.map(toRule)
    function rule(index: number) {
        // use the last rule for the rest
        const n = policy.length - 1
        return policy[Math.min(index, n)]
    }
    const newFunc = (...args: any[]) => {
        for (let i = 0; i < args.length; i++) {
            const arg = args[i]
            for (let pd of rule(i)) {
                if (!pd(arg)) throw ArgBlood(fname, fargs, i, arg, pd)
            }
        }
        return f(...args)
    }
    return newFunc as any as F
}

function validateReturn<F extends Function>(f: F, rule: rule | predicate, fname: string): F {
    let r = toRule(rule)
    const newFunc = (...args: any[]) => {
        const result = f(...args)
        for (let pd of r) {
            if (!pd(result)) throw ReturnBlood(fname, result, pd)
        }
        return result
    }
    return newFunc as any as F
}

function validateCatch<F extends Function>(f: F, fname: string): F {
    const newFunc = (...args: any[]) => {
        let result: any
        try {
            result = f(...args)
        } catch (e) {
            throw CatchBlood(fname, e)
        }
        return result
    }
    return newFunc as any as F
}

function getFuncArgs(func: Function) {
    var fnStr = func.toString()
    return fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'))
}


export function contract<F extends Function>(f: F){
    return {
        sign(argsRules: (predicate | rule)[], returnRule: predicate | rule): F {
            const name = f.name
            const fargs = getFuncArgs(f)
            f = validateCatch(f, name)
            f = validateReturn(f, returnRule, name)
            f = validateArgs(f, argsRules, name, fargs)
            return f
        }        
    }
}
