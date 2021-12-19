import { PenCls } from '../Pen'
import {  capturable, Convas } from 'paint'


export class PenRange {

    constructor(
        private pen: PenCls,
        private cv: Convas
    ) { }


    /**
     * Set the coordinate range.
     * ```
     * pen.range.set([-5,5],[-2,4]) // -5<x<5 and -2<y<4
     * ```
     */
    set(
        [xmin, xmax]: [number, number],
        [ymin, ymax]: [number, number] = [xmin, xmax]
    ) {
        this.cv.xmin = xmin
        this.cv.xmax = xmax
        this.cv.ymin = ymin
        this.cv.ymax = ymax
        this.cv.RANGE_DONE = true
    }

    /**
     * Set the coordinate range as a square.
     * ```
     * pen.range.square(5) // -5<x<5 and -5<y<5
     * pen.range.square(5,[1,2]) // -4<x<6 and -3<y<7
     * ```
     */
    square(size: number, [x, y]: Point2D = [0, 0]) {
        this.set([x - size, x + size], [y - size, y + size])
    }

    /**
     * Set the coordinate range by capture points or objects.
     * ```
     * pen.range.capture([1,2],[3,4]) //  [1,2], [3,4] must be in-view
     * pen.range.capture([[1,2],3]) //  [1-3,2-3], [1+3,2+3] must be in-view
     * // point | circle [[h,k],r] | sphere [[a,b,c],r]
     * ```
     */
    capture(...things: capturable[]) {
        this.cv.capture(things)
        this.cv.AUTO_BORDER = true
    }

    /**
     * Set the coordinate range by capture points or objects, include O(0,0).
     * ```
     * pen.range.extend([1,2],[3,4]) // [0,0], [1,2], [3,4] must be in-view
     * // point | circle [[h,k],r] | sphere [[a,b,c],r]
     * ```
     */
    extend(...things: capturable[]) {
        this.capture([0, 0], ...things)
    }






}