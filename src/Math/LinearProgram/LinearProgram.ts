
/**
 * Return result of linear programming. Equivalent to Math.abs(x).
 * @category LinearProgram
 * @param {[number, number, string, number][]} constraints - The constraints.
 * @param {number[]} field - The target function.
 * @param {number[]} [bound=[100,100]] - The virtual bounding square box
 * @return {object} The result, { vertex, integral, vertexMin, vertexMax, integralMin, integralMax }.
 * @example
 * LinearProgram([[1, 1, "<=", 5],[1, -1, "<", 4],[2, 1, ">=", -5]],[2,3,4])
 * // return { vertex:number[][], integral:number[][], vertexMin:{point,value}, vertexMax, integralMin, integralMax }
 * // vertex: an array of vertex coordinates
 * // integral: an array of feasible integral points
 * // vertexMin: info about the minimum vertex
 * // optimize P=2x+3y+4 under [x+y<=5, x-y<4, 2x+y>=5]
 */
function LinearProgram(constraints: [number, number, string, number][], field: number[], bound = [100, 100]) {
    function fieldAt(p: number[]) {
        return field[0] * p[0] + field[1] * p[1] + field[2];
    }

    function isConstrained(constraints: [number, number, string, number][], point: number[]): boolean {
        return constraints.every((constraint) => {
            let [a, b, s, c] = constraint;
            let P = a * point[0] + b * point[1] - c;
            let greater = s.includes(">") || s.includes("g");
            let eq = s.includes("=") || s.includes("e");
            if (greater && eq) return P >= 0;
            if (greater && !eq) return P > 0;
            if (!greater && eq) return P <= 0;
            if (!greater && !eq) return P < 0;
        });
    }

    function feasiblePolygon(constraints: [number, number, string, number][]) {
        let cs = [...constraints];
        cs.push([1, 0, "<", bound[0]]);
        cs.push([1, 0, ">", -bound[0]]);
        cs.push([0, 1, "<", bound[1]]);
        cs.push([0, 1, ">", -bound[1]]);

        let vertices = [];
        for (let i = 0; i < cs.length; i++) {
            for (let j = i + 1; j < cs.length; j++) {
                let [a1, b1, s1, c1] = cs[i];
                let [a2, b2, s2, c2] = cs[j];
                let p = Crammer(a1, b1, c1, a2, b2, c2);

                let otherCons = [...cs];
                otherCons.splice(j, 1);
                otherCons.splice(i, 1);
                if (isConstrained(otherCons, p)) {
                    vertices.push(p);
                }
            }
        }

        let center = ScalePoint(SumPoint(...vertices), 1 / vertices.length);
        vertices.sort((a, b) => Inclination(center, a) - Inclination(center, b));
        return vertices;
    }

    function feasibleIntegral(constraints: [number, number, string, number][]) {
        let cs = [...constraints];
        cs.push([1, 0, "<", bound[0]]);
        cs.push([1, 0, ">", -bound[0]]);
        cs.push([0, 1, "<", bound[1]]);
        cs.push([0, 1, ">", -bound[1]]);

        let points = [];
        for (let i = -100; i <= 100; i++) {
            for (let j = -100; j <= 100; j++) {
                if (isConstrained(constraints, [i, j])) {
                    points.push([i, j]);
                }
            }
        }
        return points;
    }

    function OptimizeField(field: number[], feasiblePoints: number[][]) {
        let [a, b, c] = field;
        let f = (p: number[]) => a * p[0] + b * p[1] + c;
        let ps = [...feasiblePoints];
        ps.sort((a, b) => f(a) - f(b));
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