
type predicate = (_: any) => boolean
type rule = predicate | predicate[]

// type relation = (..._: any[]) => boolean
// type relationship = relation | relation[]