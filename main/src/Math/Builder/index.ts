import { BuildAngle as $BuildAngle } from './build_angle.js'
import { BuildSolve as $BuildSolve } from './build_solve.js'
import { BuildTrend as $BuildTrend } from './build_trend.js'
import { BuildRatio as $BuildRatio } from './build_ratio.js'

globalThis.BuildAngle = $BuildAngle
globalThis.BuildSolve = $BuildSolve
globalThis.BuildTrend = $BuildTrend
globalThis.BuildRatio = $BuildRatio

declare global {
    var BuildAngle: typeof $BuildAngle
    var BuildSolve: typeof $BuildSolve
    var BuildTrend: typeof $BuildTrend
    var BuildRatio: typeof $BuildRatio
}
