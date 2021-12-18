import './Core/index.ts'
import './Math/index.ts'
import './Pen/index.ts'
import './Soil/index.ts'



// polyfill for .at
function at(this: any, n: number) {
    // ToInteger() abstract op
    n = Math.trunc(n) || 0
    // Allow negative indexing from the end
    if (n < 0) n += this.length
    // OOB access is guaranteed to return undefined
    if (n < 0 || n >= this.length) return undefined
    // Otherwise, this is just normal property access
    return this[n]
}


const TypedArray = Reflect.getPrototypeOf(Int8Array)
for (const C of [Array, String, TypedArray]) {
    // @ts-ignore
    Object.defineProperty(C.prototype, "at",
        {
            value: at,
            writable: true,
            enumerable: false,
            configurable: true
        })
}


console.log('MathTree 1')