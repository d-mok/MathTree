export class PenLabel {
    constructor(pen, cv) {
        this.pen = pen;
        this.cv = cv;
    }
    /**
     * Add a label to a point.
     * ```
     * pen.label.point([1,2],'A',180)
     * // label the point [1,2] as 'A', place the label on the left (180 degree)
     * ```
     */
    point(point, text, dir, radius = 15) {
        if (dir !== undefined) {
            this.cv.labelPoint(text, point, dir, radius);
        }
        else {
            this.cv.labelPointAuto(text, point, radius);
        }
    }
    /**
     * Add a label to points, using index as text.
     * ```
     * pen.label.points({A,B}) // label point A as 'A', point B as 'B'
     * ```
     */
    points(points) {
        for (let k in points) {
            this.point(points[k], k);
        }
    }
    /**
     * Add a label to points, using index as text, with label center set as center of points.
     * ```
     * pen.label.vertices({A,B}) // label point A as 'A', point B as 'B'
     * ```
     */
    vertices(points) {
        this.cv.save();
        this.pen.set.labelCenter(...Object.values(points));
        this.points(points);
        this.cv.restore();
    }
    /**
     * Add a label to an angle AOB.
     * ```
     * pen.label.angle([[1,2],[0,0],[-2,1]],'x')
     * // label the angle as 'x'
     * ```
     */
    angle([A, O, B], text, dir = 0, radius = -1) {
        if (radius < 0) {
            radius = 28 + this.cv.getAngleAllowance(A, O, B, 40, 1.5);
        }
        this.cv.labelAngle(text, [A, O, B], dir, radius);
    }
    /**
     * Add a label to a line AB.
     * ```
     * pen.label.line([[0,0],[2,4]],'L') // label the line as 'L'
     * ```
     */
    line([A, B], text, dir = 0, radius = 15) {
        this.cv.labelLine(text, [A, B], dir, radius);
    }
    /**
     * Add a label at the front of arrow AB.
     * ```
     * pen.label.line([[0,0],[2,4]],'L') // label the line as 'L'
     * ```
     */
    front([A, B], text, dir = 0, radius = 15) {
        this.cv.labelFront(text, [A, B], dir, radius);
    }
    /**
     * Add a label to a polygon.
     * ```
     * pen.label.polygon([[0,0],[1,0],[0,1]],'L') // label the polygon as 'L'
     * ```
     */
    polygon(points, text) {
        let pts = this.cv.pjs(points);
        this.cv.labelPoint(String(text), Mid(...pts), 0, 0);
    }
    /**
     * Add a coordinates label to a point.
     * ```
     * pen.label.coordinates([1,2],180)
     * // label the point [1,2] as '(1, 2)', place the label on the left (180 degree)
     * ```
     */
    coordinates(point, dir, radius = 15) {
        let [x, y] = point;
        x = Fix(x, 1);
        y = Fix(y, 1);
        let text = `(${x}, ${y})`;
        this.point(point, text, dir, radius);
    }
    /**
     * Add a label to the origin.
     * ```
     * pen.label.origin('O') // label the origin as 'O'
     * ```
     */
    origin(text, dir = 225) {
        this.point([0, 0], text, dir);
    }
}
