

function error(msg: string): Error {
    const e = new Error(msg)
    e.name = 'ContractError'
    return e
}

export function signature(f: Function): string {
    const s = f.toString()
    return s.slice(s.indexOf('(') + 1, s.indexOf(')'))
}

export function str(obj: any): string {
    return JSON.stringify(obj)
}

export function join(arr: any[]): string {
    return arr.map(str).join(',')
}


export function err(f: fnBranded, ...msgs: string[]): Error {
    const h = `${f.wax_name}(${f.wax_signature})`
    const ms = [h, ...msgs]
    return error(ms.join('\n'))
}


export function brand(f: fn): asserts f is fnBranded {
    if (!('wax_name' in f))
        f.wax_name = f.name ?? f.toString()
    if (!('wax_signature' in f))
        f.wax_signature = signature(f)
}

export function transferBrand(source: fnBranded, target: fn): asserts target is fnBranded {
    target.wax_name = source.wax_name
    target.wax_signature = source.wax_signature
}


export function makeStaticDecorator(transform: (_: any) => any): StaticDecorator {
    return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
        descriptor.value = transform(descriptor.value)
        return descriptor
    }
}



export function makeClassDecorator(transform: (_: any) => any): StaticDecorator {
    return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
        descriptor.value = transform(descriptor.value)
        return descriptor
    }
}


export function getClassStaticNames(constructor: Function): string[] {
    return Object.getOwnPropertyNames(constructor)
        .filter($ => $ !== 'length' && $ !== 'prototype' && $ !== 'name')
}
