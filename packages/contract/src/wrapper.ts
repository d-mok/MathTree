
// export function signature(f: Function): string {
//     const s = f.toString()
//     return s.slice(s.indexOf('(') + 1, s.indexOf(')'))
// }


// export function brand(f: fn): asserts f is fnBranded {
//     if (!('wax_name' in f))
//         f.wax_name = f.name ?? f.toString()
//     if (!('wax_signature' in f))
//         f.wax_signature = signature(f)
// }

// export function transferBrand(source: fnBranded, target: fn): asserts target is fnBranded {
//     target.wax_name = source.wax_name
//     target.wax_signature = source.wax_signature
// }



// function wrap<F extends func>(
//     f: F,
//     {
//         argsInterceptor = (...args) => args,
//         resultInterceptor = result => result,
//         errorHandler = e => { throw e },
//         functionHandler = f => { }
//     }:
//         {
//             argsInterceptor?: (...args: Parameters<F>) => Parameters<F>
//             resultInterceptor?: (result: ReturnType<F>) => ReturnType<F>
//             errorHandler?: (e: unknown) => void
//             functionHandler?: (f: F) => void
//         }
// ) {
//     brand(f)
//     functionHandler(f)
//     function nf(...args: Parameters<F>): ReturnType<F> {
//         const newArgs = argsInterceptor(...args)
//         try {
//             var result = f(...newArgs)
//         } catch (e) {
//             errorHandler(e)
//         }
//         return resultInterceptor(result)
//     }
//     transferBrand(f, nf)
//     return nf as F


// }


