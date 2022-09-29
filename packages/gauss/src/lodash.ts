import _ from 'lodash'

function includesAll<T>(superset: T[], subset: T[]): boolean {
    return _.difference(subset, superset).length === 0
}

_.mixin({ includesAll: includesAll })

declare module 'lodash' {
    interface LoDashStatic {
        includesAll: typeof includesAll
    }
}

