import { px, dot, Point2D, Point3D, Point, inch } from '../global'
import { Canvas10 } from './canvas10'



export class Pencil {

    protected cv: Canvas10 = new Canvas10()


    private RANGE_DONE = false
    private SIZE_DONE = false


    protected pj(pt: Point): Point2D {
        return this.cv.pj(pt)
    }

    protected pjs(pts: Point[]): Point2D[] {
        return this.cv.pjs(pts)
    }


    /**
     * Set the coordinate range of the canvas.
     * @param xRange - [xmin,xmax] in coordinates
     * @param yRange - [ymin,ymax] in coordinates
     */
    protected initRange([xmin, xmax]: [number, number], [ymin, ymax]: [number, number]): void {
        this.cv.xmin = xmin
        this.cv.xmax = xmax
        this.cv.ymin = ymin
        this.cv.ymax = ymax
        this.RANGE_DONE = true
    }

    /**
     * Set the physical size of the canvas.
     * @param widthInch - width of canvas in scaled unit, 1 unit = SIZE_SCALE (=10) * REM_PIXEL pixel
     * @param heightInch - height of canvas in scaled unit.
     */
    protected initSize(widthInch: number, heightInch: number): void {
        if (!this.RANGE_DONE) throw '[Pencil] Range must be set before Size'
        this.cv.widthInch = widthInch
        this.cv.heightInch = heightInch
        this.SIZE_DONE = true
    }

    /**
     * Set a border by extending the range and size.
     * The original image will be unchanged. The size will be bigger.
     */
    protected initOuterBorder(): void {
        if (!this.RANGE_DONE) throw '[Pencil] Range must be set before setting border'
        if (!this.SIZE_DONE) throw '[Pencil] Size must be set before setting border'
        this.cv.addBorder(this.cv.$BORDER)
    }











};


