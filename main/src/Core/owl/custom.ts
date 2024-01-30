export function custom<T>(
    predicate: Checker,
    funcName: string = 'custom'
): TypeGuard<T> {
    const holder = {
        [funcName](arg: unknown) {
            return predicate(arg)
        },
    }
    return holder[funcName] as TypeGuard<T>
}
