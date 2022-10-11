import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to'
expect.extend({ toBeDeepCloseTo, toMatchCloseTo })

test('Pyth', () => {
    expect(Pyth(3, 4)).toBe(5)
})

test('PythLeg', () => {
    expect(PythLeg(5, 4)).toBe(3)
})

test('CosineLawLength', () => {
    expect(CosineLawLength(5, 5, 60)).toBeCloseTo(5)
    expect(CosineLawLength(3, 4, 90)).toBeCloseTo(5)
    expect(CosineLawLength(2, 4, 30)).toBeCloseTo(2.47862735)
    expect(CosineLawLength(1, 2, 180)).toBeCloseTo(3)
    expect(CosineLawLength(4, 6, 0)).toBeCloseTo(2)
})

test('CosineLawAngle', () => {
    expect(CosineLawAngle(5, 5, 5)).toBeCloseTo(60)
    expect(CosineLawAngle(3, 4, 5)).toBeCloseTo(90)
    expect(CosineLawAngle(7, 8, 9)).toBeCloseTo(73.3984504)
    expect(() => CosineLawAngle(1, 1, 3)).toThrow()
})

test('SineLawLength', () => {
    expect(SineLawLength(60, 1, 60)).toBeCloseTo(1)
    expect(SineLawLength(90, 2, 30)).toBeCloseTo(1)
})

test('SineLawAngle', () => {
    expect(SineLawAngle(1, 60, 1)).toBeCloseTo(60)
    expect(SineLawAngle(2, 90, 1)).toBeCloseTo(30)
    expect(() => SineLawAngle(2, 90, 3)).toThrow()
})

test('Heron', () => {
    expect(Heron(3, 4, 5)).toBeCloseTo(6)
    expect(Heron(1, 1, 1)).toBeCloseTo(0.433012701)
    expect(Heron(7, 8, 9)).toBeCloseTo(26.83281573)
    expect(() => Heron(1, 1, 3)).toThrow()
})

test('SolveSSS', () => {
    expect(SolveSSS(1, 3 ** 0.5, 2)).toEqual([90, 30, 60])
    expect(() => SolveSSS(1, 1, 3)).toThrow()
})

test('SolveSAS', () => {
    expect(SolveSAS(1, 90, 3 ** 0.5)).toBeDeepCloseTo([30, 2, 60])
})

test('SolveAAS', () => {
    expect(SolveAAS(60, 90, 3 ** 0.5)).toEqual([1, 30, 2])
})

test('SolveASA', () => {
    expect(SolveASA(90, 3 ** 0.5, 30)).toEqual([2, 60, 1])
})

test('SolveSSA', () => {
    expect(SolveSSA(1, 3 ** 0.5, 30)).toEqual([90, 2, 60])
})

test('HeightsBySSS', () => {
    expect(HeightsBySSS(1, 3 ** 0.5, 2)).toBeDeepCloseTo([
        3 ** 0.5,
        1,
        0.5 * 3 ** 0.5,
    ])
    expect(() => HeightsBySSS(1, 1, 3)).toThrow()
})

test('HeightBySSS', () => {
    expect(HeightBySSS(1, 3 ** 0.5, 2)).toBeCloseTo(3 ** 0.5)
    expect(HeightBySSS(3 ** 0.5, 2, 1)).toBeCloseTo(1)
    expect(HeightBySSS(2, 1, 3 ** 0.5)).toBeCloseTo(0.5 * 3 ** 0.5)
    expect(() => HeightBySSS(1, 1, 3)).toThrow()
})

test('HeightsBySAS', () => {
    expect(HeightsBySAS(1, 90, 3 ** 0.5)).toBeDeepCloseTo([
        3 ** 0.5,
        1,
        0.5 * 3 ** 0.5,
    ])
})

test('HeightBySAS', () => {
    expect(HeightBySAS(1, 90, 3 ** 0.5)).toBeCloseTo(0.5 * 3 ** 0.5)
})

test('TriangleFromVertex', () => {
    let T = TriangleFromVertex([0, 0], [4, 0], [0, 3], false)
    expect(T.sideC).toBeCloseTo(4)
    expect(T.angleB).toBeCloseTo(36.86989765)
    expect(T.sideA).toBeCloseTo(5)
    expect(T.angleC).toBeCloseTo(53.13013235)
    expect(T.sideB).toBeCloseTo(3)
    expect(T.angleA).toBeCloseTo(90)
    T = TriangleFromVertex([-3, -2], [5, 1], [-2, 5], false)
    expect(T.sideC).toBeCloseTo(8.5440037453)
    expect(T.angleB).toBeCloseTo(50.3009265165)
    expect(T.sideA).toBeCloseTo(8.0622577483)
    expect(T.angleC).toBeCloseTo(68.3852210572)
    expect(T.sideB).toBeCloseTo(7.0710678119)
    expect(T.angleA).toBeCloseTo(61.3138524263)
    T = TriangleFromVertex([-3, -2], [5, 1], [-2, 5], true)
    expect(T.sideC).toBe(9)
    expect(T.angleB).toBe(50)
    expect(T.sideA).toBe(8)
    expect(T.angleC).toBe(68)
    expect(T.sideB).toBe(7)
    expect(T.angleA).toBe(61)
})

test('TriangleFromPoint', () => {
    let T = TriangleFromPoint([0, 0], [4, 0], [0, 3], false)
    expect(T[2]).toBeCloseTo(4)
    expect(T[4]).toBeCloseTo(36.86989765)
    expect(T[0]).toBeCloseTo(5)
    expect(T[5]).toBeCloseTo(53.13013235)
    expect(T[1]).toBeCloseTo(3)
    expect(T[3]).toBeCloseTo(90)
    T = TriangleFromPoint([-3, -2], [5, 1], [-2, 5], false)
    expect(T[2]).toBeCloseTo(8.5440037453)
    expect(T[4]).toBeCloseTo(50.3009265165)
    expect(T[0]).toBeCloseTo(8.0622577483)
    expect(T[5]).toBeCloseTo(68.3852210572)
    expect(T[1]).toBeCloseTo(7.0710678119)
    expect(T[3]).toBeCloseTo(61.3138524263)
    T = TriangleFromPoint([-3, -2], [5, 1], [-2, 5], true)
    expect(T[2]).toBe(9)
    expect(T[4]).toBe(50)
    expect(T[0]).toBe(8)
    expect(T[5]).toBe(68)
    expect(T[1]).toBe(7)
    expect(T[3]).toBe(61)
})

test('SolveTriangle', () => {
    let T = SolveTriangle({
        sideA: 2,
        sideC: 2,
        sideB: 2,
    })
    //let T = SolveTriangle(2, null, 2, null, 2, null);
    expect(T.sideA).toBeCloseTo(2)
    expect(T.angleB).toBeCloseTo(60)
    expect(T.sideC).toBeCloseTo(2)
    expect(T.angleA).toBeCloseTo(60)
    expect(T.sideB).toBeCloseTo(2)
    expect(T.angleC).toBeCloseTo(60)
    T = SolveTriangle({
        sideA: 3,
        angleB: 90,
        sideC: 4,
    })
    //T = SolveTriangle(3, 90, 4, null, null, null);
    expect(T.sideA).toBeCloseTo(3)
    expect(T.angleB).toBeCloseTo(90)
    expect(T.sideC).toBeCloseTo(4)
    expect(T.angleA).toBeCloseTo(36.86989765)
    expect(T.sideB).toBeCloseTo(5)
    expect(T.angleC).toBeCloseTo(53.13010235)
    T = SolveTriangle({
        sideA: 5,
        angleB: 30,
        angleA: 80,
    })
    //T = SolveTriangle(5, 30, null, 80, null, null);
    expect(T.sideA).toBeCloseTo(5)
    expect(T.angleB).toBeCloseTo(30)
    expect(T.sideC).toBeCloseTo(4.770944471)
    expect(T.angleA).toBeCloseTo(80)
    expect(T.sideB).toBeCloseTo(2.53856653)
    expect(T.angleC).toBeCloseTo(70)
    T = SolveTriangle({
        sideA: 6,
        angleB: 30,
        angleC: 40,
    })
    //T = SolveTriangle(6, 30, null, null, null, 40);
    expect(T.sideA).toBeCloseTo(6)
    expect(T.angleB).toBeCloseTo(30)
    expect(T.sideC).toBeCloseTo(4.10424172)
    expect(T.angleA).toBeCloseTo(110)
    expect(T.sideB).toBeCloseTo(3.192533317)
    expect(T.angleC).toBeCloseTo(40)
})

test('Orthocentre', () => {
    expect(Orthocentre([9, -6], [6, 10], [-7, 10])).toEqual([9, 13])
    expect(Orthocentre([1, 2], [3, 4], [5, 7])).toEqual([28, -16])
})

test('Circumcentre', () => {
    expect(Circumcentre([1, 7], [8, -4], [-10, 0])).toEqual([-1, -2])
    expect(Circumcentre([-7, -10], [9, 0], [9, -10])).toEqual([1, -5])
    expect(Circumcentre([1, 2], [3, 4], [5, 7])).toEqual([-9.5, 14.5])
})

test('Centroid', () => {
    expect(Centroid([3, 6], [9, 12], [15, 21])).toEqual([9, 13])
    expect(Centroid([1, 2], [3, 4], [5, 9])).toEqual([3, 5])
})

test('Incentre', () => {
    expect(Incentre([3, 0], [-3, 0], [0, 4])).toEqual([0, 1.5])
    expect(Incentre([288, -540], [225, 120], [-160, 300])).toEqual([113, 41])
})

test('ScaleOrthocentreToInt', () => {
    expect(ScaleOrthocentreToInt([34, 23], [28, 44], [0, 37])).toEqual([
        [510, 345],
        [420, 660],
        [0, 555],
    ])
    expect(ScaleOrthocentreToInt([8, 32], [40, 49], [15, 9])).toEqual([
        [1368, 5472],
        [6840, 8379],
        [2565, 1539],
    ])
})

test('ScaleCircumcentreToInt', () => {
    expect(ScaleCircumcentreToInt([15, 44], [32, 3], [49, 32])).toEqual([
        [1785, 5236],
        [3808, 357],
        [5831, 3808],
    ])
    expect(ScaleCircumcentreToInt([21, 2], [42, 41], [1, 35])).toEqual([
        [20622, 1964],
        [41244, 40262],
        [982, 34370],
    ])
})

test('ScaleCentroidToInt', () => {
    expect(ScaleCentroidToInt([50, 7], [11, 39], [16, 3])).toEqual([
        [150, 21],
        [33, 117],
        [48, 9],
    ])
    expect(ScaleCentroidToInt([12, 45], [17, 42], [8, 39])).toEqual([
        [36, 135],
        [51, 126],
        [24, 117],
    ])
})

test('ScaleIncentreToInt', () => {
    expect(ScaleIncentreToInt([2, 30], [10, 18], [11, 36])).toEqual([
        [2, 30],
        [10, 18],
        [11, 36],
    ])
    expect(ScaleIncentreToInt([36, 26], [13, 37], [19, 7])).toEqual([
        [72, 52],
        [26, 74],
        [38, 14],
    ])
})
