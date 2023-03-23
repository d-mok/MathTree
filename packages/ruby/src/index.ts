export { List, list, toList } from './array/list'

export { Predicate, Criteria, Ordering, strKeyOf, Mapper } from './array/types'

export * as INEQUAL from './math/inequal'
export { solveCompoundInequality } from './math/inequality'
export { Optimizer, optimizer } from './linear_program/optimizer'
export { Reins, toReins, reins } from './linear_program/reins'
export { Rein, rein } from './linear_program/rein'

export * as cal from './math/cal'
export { lin } from './math/linear'

export { functionize, differentiate, integrate } from './math/calculus'

import 'lodash-extension'
