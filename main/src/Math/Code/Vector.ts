import { checkIt, inspectIt, captureAll, exposeAll } from 'contract'

@exposeAll()
@captureAll()
export class Host {
    /**
     * sum of all vectors
     * ```
     * VecAdd([1,2],[3,4],[5,6]) // [9,12]
     * ```
     */
    @checkIt(owl.vector)
    static VecAdd(...vectors: Point2D[]): Point2D {
        const x = Sum(...vectors.map(p => p[0]))
        const y = Sum(...vectors.map(p => p[1]))
        return [x, y]
    }
}

declare global {
    var VecAdd: typeof Host.VecAdd
}
