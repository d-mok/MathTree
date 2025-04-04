export class PenLinProg {
    constructor(pen, cv) {
        this.pen = pen;
        this.cv = cv;
    }
    /**
     * Draw a constraint line.
     * ```
     * pen.linProg.constraint([1,2,'>',3])
     * ```
     */
    drawConstraints(...constraints) {
        for (let c of constraints) {
            if (rein.canEqual(c)) {
                this.pen.graph.linear(...rein.toLinear(c));
            }
            else {
                this.pen.set.dash(true);
                this.pen.graph.linear(...rein.toLinear(c));
                this.pen.set.dash();
            }
        }
    }
    /**
     * Shade the region of the constraint set.
     * ```
     * pen.linProg.shadeConstraints([[1,2,'>',3]])
     * ```
     */
    shadeConstraints(constraints) {
        let poly = reins.polygon(constraints);
        this.pen.polyshade(...poly);
    }
    /**
     * Label coordinates of the vertices of the feasible region.
     * ```
     * pen.linProg.verticesCoord([
     *    [1,0,'>',0],
     *    [0,1,'>',0],
     *    [1,1,'<',2]
     * ])
     * ```
     */
    verticesCoord(constraints) {
        let vs = reins.vertices(constraints);
        for (let v of vs) {
            this.pen.label.coordinates(v);
        }
    }
}
