
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
function LinearProgram(constraints: Constraint[], field: Field, bound = [100, 100]): {
    vertex: Point[],
    integral: Point[],
    vertexMin: Optimum,
    vertexMax: Optimum,
    integralMin: Optimum,
    integralMax: Optimum
} {
    function fieldAt(p: Point): number {
        return field[0] * p[0] + field[1] * p[1] + field[2];
    }

    function isConstrained(constraints: Constraint[], point: Point, strict = true): boolean {
        return constraints.every((constraint) => {
            let [a, b, s, c] = constraint;
            let P = a * point[0] + b * point[1] - c;
            let greater = s.includes(">") || s.includes("g");
            let eq = s.includes("=") || s.includes("e");
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

    function feasiblePolygon(constraints: Constraint[]): Point[] {
        let cs = [...constraints];
        cs.push([1, 0, "<", bound[0]]);
        cs.push([1, 0, ">", -bound[0]]);
        cs.push([0, 1, "<", bound[1]]);
        cs.push([0, 1, ">", -bound[1]]);

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

        let center = VectorMean(...vertices);
        vertices.sort((a, b) => Inclination(center, a) - Inclination(center, b));
        return vertices;
    }

    function feasibleIntegral(constraints: Constraint[]): Point[] {
        let cs = [...constraints];
        cs.push([1, 0, "<", bound[0]]);
        cs.push([1, 0, ">", -bound[0]]);
        cs.push([0, 1, "<", bound[1]]);
        cs.push([0, 1, ">", -bound[1]]);

        let points: Point[] = [];
        for (let i = -100; i <= 100; i++) {
            for (let j = -100; j <= 100; j++) {
                if (isConstrained(constraints, [i, j])) {
                    points.push([i, j]);
                }
            }
        }
        return points;
    }

    function OptimizeField(field: Field, feasiblePoints: Point[]): [Point, Point] {
        let [a, b, c] = field;
        let f = (p: Point) => a * p[0] + b * p[1] + c;
        let ps = [...feasiblePoints];
        ps.sort((p1, p2) => f(p1) - f(p2));
        return [ps[0], ps[ps.length - 1]];
    }

    let vertex = feasiblePolygon(constraints);
    let [minVertex, maxVertex] = OptimizeField(field, vertex);
    let vertexMin = { point: minVertex, value: fieldAt(minVertex) };
    let vertexMax = { point: maxVertex, value: fieldAt(maxVertex) };

    let integral = feasibleIntegral(constraints);
    let [minIntegral, maxIntegral] = OptimizeField(field, integral);
    let integralMin = { point: minIntegral, value: fieldAt(minIntegral) };
    let integralMax = { point: maxIntegral, value: fieldAt(maxIntegral) };

    return { vertex, integral, vertexMin, vertexMax, integralMin, integralMax };
}

globalThis.LinearProgram = LinearProgram

