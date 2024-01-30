import { custom } from './custom.js'

export function anyOf<const T>(...vals: T[]): TypeGuard<T> {
    let name = 'anyOf(' + vals.map(v => String(v)).join(',') + ')'
    let p = ($: any) => vals.includes($)
    return custom(p, name)
}
