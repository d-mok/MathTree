import { BuildSolve as $BuildSolve } from "./build_solve"
import {BuildTrend as $BuildTrend } from "./build_trend"

globalThis.BuildSolve = $BuildSolve
globalThis.BuildTrend = $BuildTrend

declare global {
    var BuildSolve: typeof $BuildSolve
    var BuildTrend: typeof $BuildTrend
}
