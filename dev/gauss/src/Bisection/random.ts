import _ from 'lodash'

function rndUniform(range: [number, number]): number {
    const [min, max] = range
    return _.random(min, max, true)
}

function rndLog(range: [number, number]): number {
    const [min, max] = range
    const logmin = Math.log10(min)
    const logmax = Math.log10(max)
    const e = rndUniform([logmin, logmax])
    return 10 ** e
}

function rndLogNeg(range: [number, number]): number {
    const [minNeg, maxNeg] = range
    const min = -maxNeg
    const max = -minNeg
    return -rndLog([min, max])
}

function rndValue(range: [number, number]): number {
    let [min, max] = range
    if (min > 0 && max > 0) return rndLog(range)
    if (min < 0 && max < 0) return rndLogNeg(range)
    return rndUniform(range)
}

function rndPoint(ranges: [number, number][]): number[] {
    return ranges.map(rndValue)
}

export function rndSignedPoint(
    eq: zeroFunction,
    ranges: [number, number][],
    sign: 1 | -1
): number[] {
    for (let i = 0; i < 100; i++) {
        const point = rndPoint(ranges)
        const value = eq(...point)
        const sameSign = value * sign > 0
        if (sameSign) return point
    }
    throw '[bisection] No signed point in ranges: ' + JSON.stringify(ranges)
}
