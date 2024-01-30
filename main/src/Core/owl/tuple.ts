import { custom } from './custom.js'

export function tuple<T1>(p1: TypeGuard<T1>): TypeGuard<[T1]>
export function tuple<T1, T2>(
    p1: TypeGuard<T1>,
    p2: TypeGuard<T2>
): TypeGuard<[T1, T2]>
export function tuple<T1, T2, T3>(
    p1: TypeGuard<T1>,
    p2: TypeGuard<T2>,
    p3: TypeGuard<T3>
): TypeGuard<[T1, T2, T3]>
export function tuple<T1, T2, T3, T4>(
    p1: TypeGuard<T1>,
    p2: TypeGuard<T2>,
    p3: TypeGuard<T3>,
    p4: TypeGuard<T4>
): TypeGuard<[T1, T2, T3, T4]>
export function tuple<T1, T2, T3, T4, T5>(
    p1: TypeGuard<T1>,
    p2: TypeGuard<T2>,
    p3: TypeGuard<T3>,
    p4: TypeGuard<T4>,
    p5: TypeGuard<T5>
): TypeGuard<[T1, T2, T3, T4, T5]>
export function tuple<T1, T2, T3, T4, T5, T6>(
    p1: TypeGuard<T1>,
    p2: TypeGuard<T2>,
    p3: TypeGuard<T3>,
    p4: TypeGuard<T4>,
    p5: TypeGuard<T5>,
    p6: TypeGuard<T6>
): TypeGuard<[T1, T2, T3, T4, T5, T6]>
export function tuple<T1, T2, T3, T4, T5, T6, T7>(
    p1: TypeGuard<T1>,
    p2: TypeGuard<T2>,
    p3: TypeGuard<T3>,
    p4: TypeGuard<T4>,
    p5: TypeGuard<T5>,
    p6: TypeGuard<T6>,
    p7: TypeGuard<T7>
): TypeGuard<[T1, T2, T3, T4, T5, T6, T7]>
export function tuple(...guards: Checker[]) {
    return custom(
        $ =>
            Array.isArray($) &&
            $.length === guards.length &&
            $.every((v, i) => guards[i](v)),
        `tuple(${guards.map(p => p.name).join(',')})`
    )
}
