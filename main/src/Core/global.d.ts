type predicate = (_: any) => boolean
type func = (...args: any[]) => any

type TypeGuard<T> = (_: unknown) => _ is T
type Checker = (_: unknown) => boolean
