import { str, getClassStaticNames } from '../util'

export function expose(name: any, f: Function): void {
    // @ts-ignore
    globalThis[String(name)] = f
}


export function exposeIt(): StaticDecorator {
    return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
        expose(key, descriptor.value)
        return descriptor
    }
}

export function exposeAll() {
    return function (constructor: Function) {
        for (let key of getClassStaticNames(constructor)) {
            let descriptor = Object.getOwnPropertyDescriptor(constructor, key)
            if (descriptor !== undefined) {
                expose(key, descriptor.value)
            }
        }
    }
}