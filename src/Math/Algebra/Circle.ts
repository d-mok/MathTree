
/**
 * @category Circle
 * @return D,E,F of circle general form
 * ```typescript
 * CircleGeneral([2,3],5) // [-4,-6,-12]
 * ```
 */
function CircleGeneral(centre: Point, radius: number): [D: number, E: number, F: number] {
    Should(IsPoint(centre), "centre must be a point")
    Should(IsPositive(radius), "radius must be positive")
    let [h, k] = centre
    let r = radius
    let D = -2 * h
    let E = -2 * k
    let F = h ** 2 + k ** 2 - r ** 2
    return [D, E, F];
}
globalThis.CircleGeneral = CircleGeneral




/**
 * @category Circle
 * @return centre and radius from general form
 * ```typescript
 * CircleFromGeneral(-4,-6,-12) // [[2,3],5]
 * ```
 */
function CircleFromGeneral(D: number, E: number, F: number): [Point, number] {
    Should(IsNum(D, E, F), "input must be num")
    let [h, k] = [-D / 2, -E / 2]
    let R = (D / 2) ** 2 + (E / 2) ** 2 - F
    Should(R >= 0, "radius should be real")
    let r = R ** 0.5
    return [[h, k], r]
}
globalThis.CircleFromGeneral = CircleFromGeneral



/**
 * @category Circle
 * @return all integral points on the circle
 * ```typescript
 * IntegralOnCircle([0,0],5) // [[[5,0],[0,5],[-5,0],[0,-5]],[[4,3],[-3,4],[-4,-3],[3,-4]],[[3,4],[-4,3],[-3,-4],[4,-3]]]
 * ```
 */
function IntegralOnCircle(centre: Point, radius: number): Point[][] {
    Should(IsPoint(centre), "centre must be a point")
    Should(IsPositive(radius), "radius must be positive")
    
    let [h, k] = centre
    let r = radius

    let [xmin, xmax] = [Floor(h - r), Ceil(h + r)]
    let [ymin, ymax] = [Floor(k - r), Ceil(k + r)]

    let arr: Point[] = []
    for (let x = xmin; x <= xmax; x++) {
        for (let y = ymin; y <= ymax; y++) {
            let P: Point = [x, y]
            if (Abs(Distance(centre, P) ** 2 - r ** 2) <= 10 * Number.EPSILON)
                arr.push(P)
        }
    }

    arr = SortBy(arr, (p: Point) => VectorArg(Vector([h, k], p)))
    let order = arr.length / 4
    let arr2 = []
    for (let i = 0; i < order; i++) {
        let temp = []
        for (let j = 0; j < 4; j++) {
            temp.push(arr[i + order * j])
        }
        arr2.push(temp)
    }
    return arr2
}
globalThis.IntegralOnCircle = IntegralOnCircle