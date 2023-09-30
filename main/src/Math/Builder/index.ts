import { BuildAngle as $BuildAngle } from './build_angle'
import { BuildSolve as $BuildSolve } from './build_solve'
import { BuildTrend as $BuildTrend } from './build_trend'
import { BuildRatio as $BuildRatio } from './build_ratio'

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
