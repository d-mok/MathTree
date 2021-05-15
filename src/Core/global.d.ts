
type predicate = (_: any) => boolean

type rule = predicate | predicate[]

type func = (...args: any[]) => any
type argPredicate<F extends func> = (...args: Parameters<F>) => boolean
type argRule<F extends func> = argPredicate<F> | argPredicate<F>[]

