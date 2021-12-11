import { BuildSolve as $BuildSolve } from "./build_solve"
import { BuildTrend as $BuildTrend } from "./build_trend"
import { BuildRatio as $BuildRatio } from "./build_ratio"
import { BuildSolve2 as $BuildSolve2 } from "./build_solve2"


globalThis.BuildSolve = $BuildSolve
globalThis.BuildTrend = $BuildTrend
globalThis.BuildRatio = $BuildRatio
globalThis.BuildSolve2 = $BuildSolve2

declare global {
    var BuildSolve: typeof $BuildSolve
    var BuildTrend: typeof $BuildTrend
    var BuildRatio: typeof $BuildRatio
    var BuildSolve2: typeof $BuildSolve2

}
