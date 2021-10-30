import { BuildSolving as $BuildSolving } from "./build_solving";
import {BuildSolvings as $BuildSolvings } from "./build_solvings"
import {BuildTrend as $BuildTrend } from "./build_trend"

globalThis.BuildSolving = $BuildSolving
globalThis.BuildSolvings = $BuildSolvings
globalThis.BuildTrend = $BuildTrend

declare global {
    var BuildSolving: typeof $BuildSolving
    var BuildSolvings: typeof $BuildSolvings
    var BuildTrend: typeof $BuildTrend
}
