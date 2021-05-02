define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.contract = void 0;
    class ContractErrorFactory {
        constructor(host) {
            this.name = host.name;
            this.signature = this.getSignature(host);
        }
        getSignature(func) {
            const fnStr = func.toString();
            return fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'));
        }
        ArgBlood(argIndex, argValue, predicate) {
            let i = String(argIndex);
            let v = JSON.stringify(argValue);
            let p = predicate.name || predicate.toString();
            return new Blood('Contract', '(' + this.name + ') arg(' + this.signature + ')[' + i + '] = ' + v + ' violate: ' + p);
        }
        ArgGrpBlood(argValues, predicate) {
            let a = argValues.map(_ => JSON.stringify(_)).join(',');
            let p = predicate.name || predicate.toString();
            return new Blood('Contract', '(' + this.name + ') arg(' + this.signature + ') = (' + a + ') violate: ' + p);
        }
        ReturnBlood(argValues, returnValue, predicate) {
            let v = returnValue;
            let a = argValues.map(_ => JSON.stringify(_)).join(',');
            let p = predicate.name || predicate.toString();
            return new Blood('Contract', '(' + this.name + ') from arg(' + this.signature + ') = (' + a + ') => return = ' + v + ' violate: ' + p);
        }
        CatchBlood(argValues, e) {
            let a = argValues.map(_ => JSON.stringify(_)).join(',');
            return new Blood('Contract', '(' + this.name + ') from arg(' + this.signature + ') = (' + a + ') throw ' + e.name + ' with message:\n' + e.message);
        }
    }
    class Contract {
        constructor(host) {
            this.host = host;
            this.Err = new ContractErrorFactory(host);
        }
        validateArg(f, rules) {
            let policy = rules.map(shieldArray);
            function rule(index) {
                // use the last rule for the rest
                const n = policy.length - 1;
                return policy[Math.min(index, n)];
            }
            const newFunc = (...args) => {
                for (let i = 0; i < args.length; i++) {
                    const arg = args[i];
                    for (let pd of rule(i)) {
                        if (!pd(arg))
                            throw this.Err.ArgBlood(i, arg, pd);
                    }
                }
                return f(...args);
            };
            return newFunc;
        }
        validateArgGrp(f, argRule) {
            let r = shieldArray(argRule);
            const newFunc = (...args) => {
                for (let pd of r) {
                    if (!pd(...args))
                        throw this.Err.ArgGrpBlood(args, pd);
                }
                return f(...args);
            };
            return newFunc;
        }
        validateReturn(f, rule) {
            let r = shieldArray(rule);
            const newFunc = (...args) => {
                const result = f(...args);
                for (let pd of r) {
                    if (!pd(result))
                        throw this.Err.ReturnBlood(args, result, pd);
                }
                return result;
            };
            return newFunc;
        }
        validateCatch(f) {
            const newFunc = (...args) => {
                try {
                    return f(...args);
                }
                catch (e) {
                    throw this.Err.CatchBlood(args, e);
                }
            };
            return newFunc;
        }
        sign(arg, ret) {
            return this.seal({ arg, ret });
        }
        seal({ arg, args, ret }) {
            let f = this.host;
            f = this.validateCatch(f);
            if (ret !== undefined)
                f = this.validateReturn(f, ret);
            if (args !== undefined)
                f = this.validateArgGrp(f, args);
            if (arg !== undefined && arg.length > 0)
                f = this.validateArg(f, arg);
            return f;
        }
    }
    function shieldArray(_) {
        return Array.isArray(_) ? _ : [_];
    }
    function contract(f) {
        return new Contract(f);
    }
    exports.contract = contract;
});
