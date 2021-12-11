type px = number
type dot = [px, px]
type Point2D = [number, number]
type Point3D = [number, number, number]
type Point = Point2D | Point3D

// math


function rad(degree: number): number {
    return degree * Math.PI / 180
}

// pixel conversion

function toPixelX(xmin: number, xmax: number, width: px, xCoord: number): px {
    let px = (xCoord - xmin) / (xmax - xmin) * width
    return Math.round(px)
}

function toPixelY(ymin: number, ymax: number, height: px, yCoord: number): px {
    let px = (yCoord - ymin) / (ymax - ymin) * height
    return Math.round(height - px)
}

function proj(point3D: Point3D, angle: number, depth: number): Point2D {
    let a = angle * Math.PI / 180
    let s = Math.sin(a)
    let c = Math.cos(a)

    let [x, y, z] = point3D
    let x_new = x + depth * y * c
    let y_new = z + depth * y * s
    return [x_new, y_new]
}

// dash handler

type segment = px[] | px | boolean

function segmentArray(seg: segment): px[] {
    if (Array.isArray(seg))
        return seg
    if (typeof seg === 'number')
        return [seg, seg]
    if (typeof seg === 'boolean')
        return seg ? [5, 5] : []
    return []
}



function forceProj(point: Point, angle: number, depth: number): Point2D {
    return point.length === 3 ? proj(point, angle, depth) : point
}



export class Convas {

    private canvas: HTMLCanvasElement = document.createElement('canvas');

    private ctx: CanvasRenderingContext2D = this.canvas.getContext("2d")!;

    protected xmin: number = 0
    protected xmax: number = 0
    protected ymin: number = 0
    protected ymax: number = 0

    protected angle3D = 60
    protected depth3D = 0.5

    protected get width(): px {
        return this.canvas.width
    }

    protected set width(value: px) {
        this.canvas.width = value
    }

    protected get height(): px {
        return this.canvas.height
    }

    protected set height(value: px) {
        this.canvas.height = value
    }

    private toPx(point: Point): dot {
        let pt = forceProj(point, this.angle3D, this.depth3D)
        let [xCoord, yCoord] = pt
        let x = toPixelX(this.xmin, this.xmax, this.width, xCoord)
        let y = toPixelY(this.ymin, this.ymax, this.height, yCoord)
        return [x, y]
    }

    private toPxs(points: Point[]): dot[] {
        return points.map($ => this.toPx($))
    }

    // settings

    protected get weight(): number {
        return this.ctx.lineWidth
    }

    protected set weight(value: number) {
        this.ctx.lineWidth = value
    }

    protected get color(): string {
        let c = this.ctx.fillStyle
        return typeof c === 'string' ? c : ''
    }

    protected set color(value: string) {
        this.ctx.strokeStyle = value
        this.ctx.fillStyle = value
    }

    protected get alpha(): number {
        return this.ctx.globalAlpha
    }

    protected set alpha(value: number) {
        this.ctx.globalAlpha = value
    }

    protected get dash(): px[] {
        return this.ctx.getLineDash()
    }

    protected set dash(value: px[] | px | boolean) {
        let seg = segmentArray(value)
        this.ctx.setLineDash(seg)
    }

    protected get textAlign(): CanvasTextAlign {
        return this.ctx.textAlign
    }

    protected set textAlign(value: CanvasTextAlign) {
        this.ctx.textAlign = value
    }

    protected get textBaseline(): CanvasTextBaseline {
        return this.ctx.textBaseline
    }

    protected set textBaseline(value: CanvasTextBaseline) {
        this.ctx.textBaseline = value
    }

    protected get textPixel(): px {
        let match = this.ctx.font.match(/(\d+)px/)
        if (match === null) return NaN
        return Number.parseInt(match[1])
    }

    protected set textPixel(value: px) {
        value = Math.round(value)
        this.ctx.font = this.ctx.font.replace(/\d+px/g, value + 'px')
    }

    protected get textItalic(): boolean {
        return this.ctx.font.includes('italic')
    }

    protected set textItalic(value: boolean) {
        this.ctx.font = this.ctx.font.replace('italic ', '')
        if (value) this.ctx.font = 'italic ' + this.ctx.font
    }

    // setting meta


    protected saveSettings(): void {
        this.ctx.save()
    }

    protected restoreSettings(): void {
        this.ctx.restore()
    }


    // transform


    protected translateTo(pt: Point): void {
        let [x, y] = this.toPx(pt)
        this.ctx.translate(x, y)
    }

    protected rotate(degreePolar: number): void {
        this.ctx.rotate(-rad(degreePolar))
    }

    protected rotateTo(start: Point, end: Point): void {
        let [x1, y1] = this.toPx(start)
        let [x2, y2] = this.toPx(end)
        let dx = x2 - x1
        let dy = y2 - y1
        let q = Math.atan2(dy, dx)
        this.ctx.rotate(q)
    }

    // drawer

    protected moveTo(pt: Point) {
        let [x, y] = this.toPx(pt)
        this.ctx.moveTo(x, y)
    }

    protected lineTo(pt: Point) {
        let [x, y] = this.toPx(pt)
        this.ctx.lineTo(x, y)
    }

    // private createPath(pts: Point[]) {
    //     this.ctx.beginPath()
    //     if (pts.length === 0) return
    //     let [first, ...rest] = pts
    //     this.moveTo(first)
    //     for (let p of rest) {
    //         this.lineTo(p)
    //     }
    // }


    protected arcPath(center: dot, radius: px, angle: [number, number]) {
        let [x, y] = center
        let [q1, q2] = angle
        q1 = -rad(q1)
        q2 = -rad(q2)
        this.ctx.beginPath()
        this.ctx.arc(x, y, radius, q1, q2, true)
    }




}