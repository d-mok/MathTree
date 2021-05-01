type func = (...args: any[]) => any
type relation<F extends func> = (...args: Parameters<F>) => boolean
type relationship<F extends func> = relation<F> | relation<F>[]




class ContractErrorFactory {
    // private host: Function
    private name: string
    private signature: string
    constructor(host: func) {
        // this.host = host;
        this.name = host.name
        this.signature = this.getSignature(host)
    }


    private getSignature(func: func): string {
        const fnStr = func.toString()
        return fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'))
    }

    ArgBlood(argIndex: number, argValue: any, predicate: predicate): Blood {
        let i = String(argIndex)
        let v = JSON.stringify(argValue)
        let p = predicate.name || predicate.toString()
        return new Blood(
            'Contract',
            '(' + this.name + ') arg(' + this.signature + ')[' + i + '] = ' + v + ' violate: ' + p
        )
    }


    ArgGrpBlood(argValues: any[], relation: func): Blood {
        let a = argValues.map(_ => JSON.stringify(_)).join(',')
        let r = relation.name || relation.toString()
        return new Blood(
            'Contract',
            '(' + this.name + ') arg(' + this.signature + ') = (' + a + ') violate: ' + r
        )
    }


    ReturnBlood(argValues: any[], returnValue: any, predicate: predicate): Blood {
        let v = returnValue
        let a = argValues.map(_ => JSON.stringify(_)).join(',')
        let p = predicate.name || predicate.toString()
        return new Blood(
            'Contract',
            '(' + this.name + ') from arg(' + this.signature + ') = (' + a + ') => return = ' + v + ' violate: ' + p
        )
    }

    CatchBlood(argValues: any[], e: Error): Blood {
        let a = argValues.map(_ => JSON.stringify(_)).join(',')
        return new Blood(
            'Contract',
            '(' + this.name + ') from arg(' + this.signature + ') = (' + a + ') throw ' + e.name + ' with message:\n' + e.message
        )
    }
}


class Contract<F extends (...args: any[]) => any>{
    private host: F
    private Err: ContractErrorFactory
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
        const newFunc = (...args: any[]) => {
            for (let i = 0; i < args.length; i++) {
                const arg = args[i]
                for (let pd of rule(i)) {
                    if (!pd(arg)) throw this.Err.ArgBlood(i, arg, pd)
                }
            }
            return f(...args)
        }
        return newFunc as any as F
    }

    private validateArgGrp(f: F, relationship: relationship<F>): F {
        let r = shieldArray(relationship)
        const newFunc = (...args: Parameters<F>) => {
            for (let rel of r) {
                if (!rel(...args)) throw this.Err.ArgGrpBlood(args, rel)
            }
            return f(...args)
        }
        return newFunc as any as F
    }



    private validateReturn(f: F, rule: rule): F {
        let r = shieldArray(rule)
        const newFunc = (...args: any[]) => {
            const result = f(...args)
            for (let pd of r) {
                if (!pd(result)) throw this.Err.ReturnBlood(args, result, pd)
            }
            return result
        }
        return newFunc as any as F
    }



    private validateCatch(f: F): F {
        const newFunc = (...args: any[]) => {
            try {
                return f(...args)
            } catch (e) {
                throw this.Err.CatchBlood(args, e)
            }
        }
        return newFunc as any as F
    }



    sign(arg: rule[], ret?: rule): F {
        return this.seal({ arg, ret })
    }

    seal({ arg, args, ret }: {
        arg?: rule[],
        args?: relationship<F>,
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




