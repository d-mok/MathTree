import _ from 'lodash'
import * as math from 'mathjs'

function median(nums: number[]): number {
    return math.median(...nums)
}

function mode(nums: number[]): number[] {
    return math.mode(...nums)
}

function std(nums: number[]): number {
    return math.std(nums, 'uncorrected')
}

declare module 'lodash' {
    interface LoDashStatic {
        median: typeof median
        mode: typeof mode
        std: typeof std
    }
}

_.mixin({ median, mode, std })
