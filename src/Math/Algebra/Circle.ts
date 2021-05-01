
/**
 * @category Circle
 * @return D,E,F of circle general form
 * ```
 * CircleGeneral([2,3],5) // [-4,-6,-12]
 * ```
 */
function CircleGeneral(centre: Point, radius: number): [D: number, E: number, F: number] {
    let [h, k] = centre
    let r = radius
    let D = -2 * h
    let E = -2 * k
    let F = h ** 2 + k ** 2 - r ** 2
    return [D, E, F];
}
globalThis.CircleGeneral = contract(CircleGeneral).sign([owl.point, owl.positive])




/**
 * @category Circle
 * @return centre and radius from general form
 * ```
 * CircleFromGeneral(-4,-6,-12) // [[2,3],5]
 * ```
 */
function CircleFromGeneral(D: number, E: number, F: number): [Point, number] {
    let [h, k] = [-D / 2, -E / 2]
    let R = (D / 2) ** 2 + (E / 2) ** 2 - F
    Should(R >= 0, "radius should be real")
    let r = R ** 0.5
    return [[h, k], r]
}
globalThis.CircleFromGeneral = contract(CircleFromGeneral).sign([owl.num])



/**
 * @category Circle
 * @return all integral points on the circle
 * ```
 * IntegralOnCircle([0,0],5) // [[[5,0],[0,5],[-5,0],[0,-5]],[[4,3],[-3,4],[-4,-3],[3,-4]],[[3,4],[-4,3],[-3,-4],[4,-3]]]
 * ```
 */
function IntegralOnCircle(centre: Point, radius: number): Point[][] {
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
globalThis.IntegralOnCircle = contract(IntegralOnCircle).sign([owl.point, owl.positive])