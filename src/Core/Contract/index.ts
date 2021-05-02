

class ContractErrorFactory<F extends func> {
    private name: string
    private signature: string
    constructor(host: F) {
        this.name = host.name
        this.signature = this.getSignature(host)
    }


    private getSignature(func: func): string {
        const fnStr = func.toString()
        return fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'))
    }

    ArgBlood(argIndex: number, argValue: unknown, predicate: predicate): Blood {
        let i = String(argIndex)
        let v = JSON.stringify(argValue)
        let p = predicate.name || predicate.toString()
        return new Blood(
            'Contract',
            '(' + this.name + ') arg(' + this.signature + ')[' + i + '] = ' + v + ' violate: ' + p
        )
    }


    ArgGrpBlood(argValues: Parameters<F>, predicate: argPredicate<F>): Blood {
        let a = argValues.map(_ => JSON.stringify(_)).join(',')
        let p = predicate.name || predicate.toString()
        return new Blood(
            'Contract',
            '(' + this.name + ') arg(' + this.signature + ') = (' + a + ') violate: ' + p
        )
    }


    ReturnBlood(argValues: Parameters<F>, returnValue: unknown, predicate: predicate): Blood {
        let v = returnValue
        let a = argValues.map(_ => JSON.stringify(_)).join(',')
        let p = predicate.name || predicate.toString()
        return new Blood(
            'Contract',
            '(' + this.name + ') from arg(' + this.signature + ') = (' + a + ') => return = ' + v + ' violate: ' + p
        )
    }

    CatchBlood(argValues: Parameters<F>, e: Error): Blood {
        let a = argValues.map(_ => JSON.stringify(_)).join(',')
        return new Blood(
            'Contract',
            '(' + this.name + ') from arg(' + this.signature + ') = (' + a + ') throw ' + e.name + ' with message:\n' + e.message
        )
    }
}


class Contract<F extends func>{
    private host: F
    private Err: ContractErrorFactory<F>
    constructor(host: F) {
        this.host = host;
        this.Err = new ContractErrorFactory(host)
    }

    private validateArg(f: F, rules: rule[]): F {
        let policy = rules.map(shieldArray)
        function rule(index: number) {
            // use the last rule for the rest
            const n = policy.length - 1
            return policy[Math.min(index, n)]
        }
        const newFunc = (...args: Parameters<F>) => {
            for (let i = 0; i < args.length; i++) {
                const arg = args[i]
                for (let pd of rule(i)) {
                    if (!pd(arg)) throw this.Err.ArgBlood(i, arg, pd)
                }
            }
            return f(...args)
        }
        return newFunc as unknown as F
    }

    private validateArgGrp(f: F, argRule: argRule<F>): F {
        let r = shieldArray(argRule)
        const newFunc = (...args: Parameters<F>) => {
            for (let pd of r) {
                if (!pd(...args)) throw this.Err.ArgGrpBlood(args, pd)
            }
            return f(...args)
        }
        return newFunc as unknown as F
    }

    private validateReturn(f: F, rule: rule): F {
        let r = shieldArray(rule)
        const newFunc = (...args: Parameters<F>) => {
            const result = f(...args)
            for (let pd of r) {
                if (!pd(result)) throw this.Err.ReturnBlood(args, result, pd)
            }
            return result
        }
        return newFunc as unknown as F
    }


    private validateCatch(f: F): F {
        const newFunc = (...args: Parameters<F>) => {
            try {
                return f(...args)
            } catch (e) {
                throw this.Err.CatchBlood(args, e)
            }
        }
        return newFunc as unknown as F
    }

    sign(arg?: rule[], ret?: rule): F {
        return this.seal({ arg, ret })
    }

    seal({ arg, args, ret }: {
        arg?: rule[],
        args?: argRule<F>,
        ret?: rule
    }): F {
        let f = this.host
        f = this.validateCatch(f)
        if (ret !== undefined)
            f = this.validateReturn(f, ret)
        if (args !== undefined)
            f = this.validateArgGrp(f, args)
        if (arg !== undefined && arg.length > 0)
            f = this.validateArg(f, arg)
        return f
    }
}


function shieldArray<T>(_: T | T[]): T[] {
    return Array.isArray(_) ? _ : [_]
}


export function contract<F extends func>(f: F) {
    return new Contract(f)
}




