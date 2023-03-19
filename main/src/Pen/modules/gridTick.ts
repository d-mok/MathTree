import { PenCls } from '../Pen'
import { Convas } from 'paint'

export class PenGridTick {
    constructor(private pen: PenCls, private cv: Convas) {}

    /**
     * Draw gridlines and ticks on the x-axis.
     * ```
     * pen.gridTick.x(2) // at interval 2 units
     * ```
     */
    x(interval = 1, mark = true) {
        this.pen.grid.x(interval)
        this.pen.tick.x(interval, mark)
    }

    /**
     * Draw gridlines and ticks on the y-axis.
     * ```
     * pen.gridTick.y(2) // at interval 2 units
     * ```
     */
    y(interval = 1, mark = true) {
        this.pen.grid.y(interval)
        this.pen.tick.y(interval, mark)
    }

    /**
     * Draw gridlines and ticks on both axis.
     * ```
     * pen.gridTick.xy(2) // at interval 2 units
     * ```
     */
    xy(interval = 1, mark = true) {
        this.x(interval, mark)
        this.y(interval, mark)
    }
}
