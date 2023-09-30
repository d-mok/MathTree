import _ from 'lodash'
import * as math from 'mathjs'

test('Quadrant', () => {
    expect(Quadrant([1, 1])).toBe('I')
    expect(Quadrant([-1, 1])).toBe('II')
    expect(Quadrant(200)).toBe('III')
    expect(Quadrant(350)).toBe('IV')
    expect(Quadrant(0)).toBe('I')
    expect(Quadrant([0, 0])).toBe('I')
})

test('PolToRect', () => {
    expect(PolToRect([1, 45])[0]).toBeCloseTo(2 ** -0.5, 12)
    expect(PolToRect([1, 45])[1]).toBeCloseTo(2 ** -0.5, 12)
    expect(PolToRect([1, 135])[0]).toBeCloseTo(-(2 ** -0.5), 12)
    expect(PolToRect([1, 135])[1]).toBeCloseTo(2 ** -0.5, 12)
    expect(PolToRect([0, 0])).toEqual([0, 0])
})

test('RectToPol', () => {
    expect(RectToPol([1, 1])).toEqual([2 ** 0.5, 45])
    expect(RectToPol([2, -2])).toEqual([8 ** 0.5, 315])
    expect(RectToPol([0, 0])).toEqual([0, 0])
})

test('ASTC', () => {
    expect(ASTC(1, 'sin')).toBe(1)
    expect(ASTC(1, 'cos')).toBe(1)
    expect(ASTC(1, 'tan')).toBe(1)
    expect(ASTC(2, 'sin')).toBe(1)
    expect(ASTC(2, 'cos')).toBe(-1)
    expect(ASTC(2, 'tan')).toBe(-1)
    expect(ASTC(3, 'sin')).toBe(-1)
    expect(ASTC(3, 'cos')).toBe(-1)
    expect(ASTC(3, 'tan')).toBe(1)
    expect(ASTC(4, 'sin')).toBe(-1)
    expect(ASTC(4, 'cos')).toBe(1)
    expect(ASTC(4, 'tan')).toBe(-1)
    expect(ASTC('III', 'tan')).toEqual(1)
})

test('TrigSolve', () => {
    expect(TrigSolve('sin', 0)).toEqual([0, 180, 360])
    expect(TrigSolve('sin', 0.5)).toEqual([30, 150])
    expect(TrigSolve('sin', 1)).toEqual([90])
    expect(TrigSolve('sin', 2)).toEqual([])
    expect(TrigSolve('cos', 0)).toEqual([90, 270])
    expect(TrigSolve('cos', 0.5)).toEqual([60, 300])
    expect(TrigSolve('cos', 1)).toEqual([0, 360])
    expect(TrigSolve('cos', -2)).toEqual([])
    expect(TrigSolve('tan', 0)).toEqual([0, 180, 360])
    expect(TrigSolve('tan', 1)).toEqual([45, 225])
})

test('PolarReduce', () => {
    expect(PolarReduce(0)).toBe(0)
    expect(PolarReduce(360)).toBe(0)
    expect(PolarReduce(370)).toBe(10)
    expect(PolarReduce(-10)).toBe(350)
    expect(PolarReduce(190)).toBe(190)
    expect(PolarReduce(720)).toBe(0)
    expect(PolarReduce(1000)).toBe(280)
    expect(PolarReduce(-1000)).toBe(80)
})

test('PolarDiff', () => {
    expect(PolarDiff(80, 70)).toBe(10)
    expect(PolarDiff(350, 10)).toBe(20)
    expect(PolarDiff(0, 360)).toBe(0)
    expect(PolarDiff(1000, 20)).toBe(100)
    expect(PolarDiff(-30, 20)).toBe(50)
    expect(PolarDiff(20, 20)).toBe(0)
})

describe('WholeBearing and CompassBearing', () => {
    const cases: [number, string, string][] = [
        [0, '090°', 'east'],
        [90, '000°', 'north'],
        [100, '350°', 'N10°W'],
        [180, '270°', 'west'],
        [350, '100°', 'S80°E'],
        [30, '060°', 'N60°E'],
        [1000, '170°', 'S10°E'],
        [260, '190°', 'S10°W'],
    ]
    it.each(cases)(
        'WholeBearing(%p) & CompassBearing(%p)',
        (input: number, whole: string, compass: string) => {
            expect(WholeBearing(input)).toBe(whole)
            expect(CompassBearing(input)).toBe(compass)
        }
    )
})
