type func = (...args: any[]) => any
type brand = { wax_name: string, wax_signature: string }
type fn = func & Partial<brand>
type fnBranded = func & brand



type StaticDecorator = (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => PropertyDescriptor


