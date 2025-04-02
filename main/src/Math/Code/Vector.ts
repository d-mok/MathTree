import _ from 'lodash'
import * as math from 'mathjs'

/**
 * sum of all vectors
 * ```
 * VecAdd([1,2],[3,4],[5,6]) // [9,12]
 * ```
 */
export function VecAdd(...vectors: Point2D[]): Point2D {
    const x = Sum(...vectors.map(p => p[0]))
    const y = Sum(...vectors.map(p => p[1]))
    return [x, y]
}
