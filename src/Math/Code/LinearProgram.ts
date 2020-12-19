
/**
 * @category LinearProgram
 * @return result of linear programming.
 * ```typescript
 * LinearProgram([[1, 1, "<=", 5], [1, -1, "<", 4], [2, 1, ">=", -5]], [2,3,4])
 * // optimize P=2x+3y+4 under [x+y<=5, x-y<4, 2x+y>=5]
 * // vertex: an array of vertex coordinates
 * // integral: an array of feasible integral points
 * // vertexMin: info about the minimum vertex
 * ```
 */
function LinearProgram(
    constraints: Constraint[],
    field: Field,
    bound = [100, 100]
): {
    vertex: Point[],
    integral: Point[],
    vertexMin: Optimum | undefined,
    vertexMax: Optimum | undefined,
    integralMin: Optimum | undefined,
    integralMax: Optimum | undefined
} {
    function fieldAt(p: Point): number {
        const [a, b, c] = field
        const [x, y] = p
        return a * x + b * y + c
    }

    function isConstrained(constraints: Constraint[], point: Point, strict = true): boolean {
        const [x, y] = point
        return constraints.every((constraint) => {
            let [a, b, s, c] = constraint;
            let P = a * x + b * y - c;
            let [greater, eq] = ParseIneqSign(s)!
            if (strict) {
                if (greater && eq) return P >= 0;
                if (greater && !eq) return P > 0;
                if (!greater && eq) return P <= 0;
                if (!greater && !eq) return P < 0;
            } else {
                if (greater) return P >= 0;
                if (!greater) return P <= 0;
            }
        });
    }

    const [xBound, yBound] = bound
    const boundaryConstraints: Constraint[] = [
        [1, 0, "<=", xBound],
        [1, 0, ">=", -xBound],
        [0, 1, "<=", yBound],
        [0, 1, ">=", -yBound]
    ]

    function feasiblePolygon(): Point[] {
        let cs = [...constraints, ...boundaryConstraints];
        let vertices: Point[] = [];
        for (let i = 0; i < cs.length; i++) {
            for (let j = i + 1; j < cs.length; j++) {
                let [a1, b1, s1, c1] = cs[i];
                let [a2, b2, s2, c2] = cs[j];
                let p = Crammer(a1, b1, c1, a2, b2, c2);

                let otherCons = [...cs];
                otherCons.splice(j, 1);
                otherCons.splice(i, 1);
                if (isConstrained(otherCons, p, false)) {
                    vertices.push(p);
                }
            }
        }
        const center = VectorMean(...vertices);
        vertices = SortBy(vertices, x => Inclination(center, x))
        return vertices;
    }

    function feasibleIntegral(): Point[] {
        let points: Point[] = [];
        for (let i = -xBound; i <= xBound; i++) {
            for (let j = -yBound; j <= yBound; j++) {
                if (isConstrained(constraints, [i, j])) {
                    points.push([i, j]);
                }
            }
        }
        return points;
    }

    function onBoundary(p: Point) {
        let [x, y] = p
        return Abs(x) >= xBound || Abs(y) >= yBound
    }

    function optimum(p: Point | undefined): Optimum | undefined {
        if (!p) return undefined
        if (onBoundary(p)) return undefined
        return { point: p, value: fieldAt(p) };
    }


    function OptimizeField(feasiblePoints: Point[]): [min: Optimum | undefined, max: Optimum | undefined] {
        let ps = SortBy(feasiblePoints, fieldAt)
        let [minPoint, maxPoint]: [Point | undefined, Point | undefined] = [ps[0], ps[ps.length - 1]]
        return [optimum(minPoint), optimum(maxPoint)];
    }

    let vertex = feasiblePolygon();
    let [vertexMin, vertexMax] = OptimizeField(vertex);

    let integral = feasibleIntegral();
    let [integralMin, integralMax] = OptimizeField(integral);

    return { vertex, integral, vertexMin, vertexMax, integralMin, integralMax };
}

globalThis.LinearProgram = LinearProgram

