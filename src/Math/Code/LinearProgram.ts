const LP_BOUND = 100


function onBoundary(p: Point) {
    return Abs(p[0]) >= LP_BOUND || Abs(p[1]) >= LP_BOUND
}



function FieldAt(p: Point, field: Field): number {
    const [a, b, c] = field
    const [x, y] = p
    return a * x + b * y + c
}
globalThis.FieldAt = FieldAt

/**
 * 
 * @category LinearProgram
 * @return check if point is constrained by cons
 * ```typescript
 * isConstrained([
 *    [1, 1, "<=", 5],
 *    [1, -1, "<", 4],
 *    [2, 1, ">=", -5]
 * ], [0, 0])
 * // check whether [0,0] satisfies all the constraints
 * ```
 */
function isConstrained(cons: Constraint[], point: Point): boolean {
    const [x, y] = point
    return cons.every(con => {
        let [a, b, s, c] = con;
        let P = a * x + b * y - c;
        let [greater, eq] = ParseIneqSign(s)
        if (greater && eq) return P >= 0;
        if (greater && !eq) return P > 0;
        if (!greater && eq) return P <= 0;
        if (!greater && !eq) return P < 0;
    });
}
globalThis.isConstrained = isConstrained

/**
 * 
 * @category LinearProgram
 * @return check if point is constrained by cons, treating all cons as 'or equal to'
 * ```typescript
 * isLooseConstrained([
 *    [1, 1, "<=", 5],
 *    [1, -1, "<", 4],
 *    [2, 1, ">=", -5]
 * ], [0, 0])
 * // check whether [0,0] loosely satisfies all the constraints
 * ```
 */
function isLooseConstrained(cons: Constraint[], point: Point): boolean {
    const [x, y] = point
    return cons.every(con => {
        let [a, b, s, c] = con;
        let P = a * x + b * y - c;
        let [greater, _] = ParseIneqSign(s)
        if (greater) return P >= 0;
        if (!greater) return P <= 0;
    });
}
globalThis.isLooseConstrained = isLooseConstrained



function FeasiblePolygon(cons: Constraint[]) {
    const boundaryConstraints: Constraint[] = [
        [1, 0, "<=", LP_BOUND],
        [1, 0, ">=", -LP_BOUND],
        [0, 1, "<=", LP_BOUND],
        [0, 1, ">=", -LP_BOUND]
    ]
    let cs = [...cons, ...boundaryConstraints];
    let vertices: Point[] = [];
    for (let i = 0; i < cs.length; i++) {
        for (let j = i + 1; j < cs.length; j++) {
            let [a1, b1, s1, c1] = cs[i];
            let [a2, b2, s2, c2] = cs[j];
            if (a1 / b1 === a2 / b2) continue
            let p = Crammer(a1, b1, c1, a2, b2, c2);

            let otherCons = [...cs];
            otherCons.splice(j, 1);
            otherCons.splice(i, 1);
            if (isLooseConstrained(otherCons, p)) {
                vertices.push(p);
            }
        }
    }
    Should(vertices.length > 2, 'No feasible region.')
    const center = VectorMean(...vertices);
    vertices = SortBy(vertices, x => Inclination(center, x))
    return vertices;
}
globalThis.FeasiblePolygon = FeasiblePolygon


function FeasibleIntegral(cons: Constraint[]): Point[] {
    let vertices = FeasiblePolygon(cons)
    let xCoords = vertices.map(p => p[0])
    let yCoords = vertices.map(p => p[1])
    let xmax = Ceil(Max(...xCoords))
    let xmin = Floor(Min(...xCoords))
    let ymax = Ceil(Max(...yCoords))
    let ymin = Floor(Min(...yCoords))

    let points: Point[] = [];
    for (let i = xmin; i <= xmax; i++) {
        for (let j = ymin; j <= ymax; j++) {
            let p: Point = [i, j]
            if (isConstrained(cons, p)) points.push(p);
        }
    }
    return points;
}
globalThis.FeasibleIntegral = FeasibleIntegral



function MaximizePoint(points: Point[], field: Field): Point {
    Should(points.length > 0, 'No feasible point')
    let point = SortBy(points, x => -FieldAt(x, field))[0]
    Should(!onBoundary(point), 'No max point')
    return point
}
globalThis.MaximizePoint = MaximizePoint




function MinimizePoint(points: Point[], field: Field): Point {
    Should(points.length > 0, 'No feasible point')
    let point = SortBy(points, x => FieldAt(x, field))[0]
    Should(!onBoundary(point), 'No min point')
    return point
}
globalThis.MinimizePoint = MinimizePoint

