import { BasicCanvas } from './basic_canvas'

type px = number
type dot = [px, px]
type Point2D = [number, number]
type Point3D = [number, number, number]
type Point = Point2D | Point3D

// math


function rad(degree: number): number {
    return degree * Math.PI / 180
}


function deg(radian: number): number {
    return radian / Math.PI * 180
}


function dotVec([x1, y1]: dot, [x2, y2]: dot): dot {
    return [x2 - x1, y2 - y1]
}


function dir(A: dot, B: dot): number {
    let [dx, dy] = dotVec(A, B)
    let rad = -Math.atan2(dy, dx)
    return deg(rad)
}

function scaleDot([x, y]: dot, ratio: number): dot {
    return [x * ratio, y * ratio]
}

function dist(A: dot, B: dot): number {
    let [dx, dy] = dotVec(A, B)
    return (dx * dx + dy * dy) ** 0.5
}

function addDot([x1, y1]: dot, [x2, y2]: dot): dot {
    return [x1 + x2, y1 + y2]
}

function scaleDotTo(A: dot, length: number): dot {
    let oldLength = dist([0, 0], A)
    let ratio = length / oldLength
    return scaleDot(A, ratio)
}

function moveDot(A: dot, B: dot, dist: number): dot {
    let AB = dotVec(A, B)
    let d = scaleDotTo(AB, dist)
    return addDot(A, d)
}



export function sin(degree: number): number {
    return Math.sin(degree / 180 * Math.PI)
}


export function cos(degree: number): number {
    return Math.cos(degree / 180 * Math.PI)
}


// polar


export function vec(p1: Point2D, p2: Point2D): Point2D {
    let [x1, y1] = p1
    let [x2, y2] = p2
    return [x2 - x1, y2 - y1]
}


export function cross2D(vec1: Point2D, vec2: Point2D): number {
    let [x1, y1] = vec1
    let [x2, y2] = vec2
    return x1 * y2 - y1 * x2
}


/**
 * @return check if the polar angle AOB is reflex
 * ```
 * IsReflex([1,0],[0,0],[0,2]) // false
 * IsReflex([2,2],[1,1],[1,3]) // false
 * IsReflex([1,3],[1,1],[2,2]) // true
 * ```
 */
function IsReflex(A: Point2D, O: Point2D, B: Point2D): boolean {
    let OA = vec(O, A)
    let OB = vec(O, B)
    return cross2D(OA, OB) < 0
}

function polarFlip(A: Point2D, O: Point2D, B: Point2D, mode: 'normal' | 'polar' | 'reflex'): boolean {
    let isReflex = IsReflex(A, O, B)
    if (mode === 'normal' && isReflex) return true
    if (mode === 'reflex' && !isReflex) return true
    return false
}





// latex


/**
 * CanvasLatex is a library that must be imported from script tag
 */
function LatexWidget(text: string, color: string, size: number) {
    text = `\\color{${color}} ` + text
    // @ts-ignore
    const widget = new CanvasLatex.default(
        text,
        {
            displayMode: true,
            debugBounds: false,
            baseSize: size
        }
    )
    return widget
}

function latexTuneX(x: number, width: number, textAlign: CanvasTextAlign): px {
    if (textAlign === 'left') return - x
    if (textAlign === 'right') return - x - width
    if (textAlign === 'center') return - x - width / 2
    return - x - width / 2
}

function latexTuneY(y: number, height: number, textBaseline: CanvasTextBaseline): px {
    if (textBaseline === 'top') return - y
    if (textBaseline === 'bottom') return - y - height
    if (textBaseline === 'middle') return - y - height / 2
    return - y / 2
}



// Const

const DEFAULT_SHADE_ALPHA = 0.1



export class Convas extends BasicCanvas {

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

    protected alignTo(start: Point, end: Point): void {
        this.translateTo(end)
        this.rotateTo(start, end)
    }

    // straight drawer in px

    protected moveToPx([x, y]: dot) {
        this.ctx.moveTo(x, y)
    }


    protected lineToPx([x, y]: dot) {
        this.ctx.lineTo(x, y)
    }


    protected createPathPx(dots: dot[]) {
        this.ctx.beginPath()
        if (dots.length === 0) return
        let [first, ...rest] = dots
        this.moveToPx(first)
        for (let d of rest) {
            this.lineToPx(d)
        }
    }

    protected createShapePx(dots: dot[]) {
        this.createPathPx(dots)
        this.ctx.closePath()
    }




    // drawer in coord

    protected moveTo(pt: Point) {
        let [x, y] = this.toPx(pt)
        this.ctx.moveTo(x, y)
    }

    protected lineTo(pt: Point) {
        let [x, y] = this.toPx(pt)
        this.ctx.lineTo(x, y)
    }

    protected createPath(pts: Point[]) {
        this.ctx.beginPath()
        if (pts.length === 0) return
        let [first, ...rest] = pts
        this.moveTo(first)
        for (let p of rest) {
            this.lineTo(p)
        }
    }


    protected createShape(pts: Point[]) {
        this.createPath(pts)
        this.ctx.closePath()
    }


    protected createArc(center: Point, radius: px, angle: [number, number]) {
        let [x, y] = this.toPx(center)
        let [q1, q2] = angle
        q1 = -rad(q1)
        q2 = -rad(q2)
        this.ctx.beginPath()
        this.ctx.arc(x, y, radius, q1, q2, true)
    }


    protected createArcByPoints(P: Point, O: Point, Q: Point, radius: px) {
        let p = this.toPx(P)
        let o = this.toPx(O)
        let q = this.toPx(Q)
        let q1 = dir(o, p)
        let q2 = dir(o, q)
        this.createArc(O, radius, [q1, q2])
    }

    protected createRightAnglePath(P: Point, O: Point, Q: Point, size: px) {
        let p = this.toPx(P)
        let o = this.toPx(O)
        let q = this.toPx(Q)
        let a = moveDot(o, p, size)
        let b = moveDot(o, q, size)
        let c = addDot(b, dotVec(o, a))
        this.createPathPx([a, c, b])
    }


    // finishing

    protected doStroke() {
        this.ctx.stroke()
    }

    protected doSolid() {
        let dash = this.$DASH
        this.$DASH = false
        this.ctx.stroke()
        this.$DASH = dash
    }

    protected doDash() {
        let dash = this.$DASH
        this.$DASH = true
        this.ctx.stroke()
        this.$DASH = dash
    }

    protected doFill() {
        this.ctx.fill()
    }

    protected doShade() {
        let alpha = this.$ALPHA
        this.$ALPHA = DEFAULT_SHADE_ALPHA
        this.ctx.fill()
        this.$ALPHA = alpha
    }


    // text in pixel

    private plainPx(text: string, dot: dot) {
        text = String(text)
        if (text === '') return
        this.save()
        this.ctx.translate(...dot)
        this.rotate(this.$TEXT_DIR)
        this.ctx.fillText(text, 0, 0)
        this.restore()
    }


    private latexPx(text: string, dot: dot) {
        text = String(text)
        if (text === '') return

        const widget = LatexWidget(text, this.$COLOR, this.$TEXT_PIXEL)
        const bounds = widget.getBounds()

        if (bounds === null) {
            console.error('[CanvasLatex] bounds === null! This is an unexpected error.')
            return
        }

        this.save()
        this.ctx.translate(...dot)
        this.rotate(this.$TEXT_DIR)
        let xTune = latexTuneX(bounds.x, bounds.width, this.ctx.textAlign)
        let yTune = latexTuneY(bounds.y, bounds.height, this.ctx.textBaseline)
        this.ctx.translate(xTune, yTune)
        widget.draw(this.ctx)
        this.restore()
    }

    private textPx(text: string, dot: dot) {
        if (this.$TEXT_LATEX) {
            this.latexPx(text, dot)
        } else {
            this.plainPx(text, dot)
        }
    }

    // text in coord

    public text(text: string, point: Point, offset: dot) {
        let [x, y] = this.toPx(point)
        x += offset[0]
        y -= offset[1]
        this.textPx(text, [x, y])
    }

    // label in coord

    public textDodge(text: string, point: Point, radius: px, dodge: number) {
        let textWidth = this.textSemi(text)
        let xOffset = (radius + textWidth - 5) * cos(dodge)
        let yOffset = radius * sin(dodge)
        this.text(text, point, [xOffset, yOffset])
    }

    // text width

    private plainSemi(text: string): px {
        return this.ctx.measureText(text).width / 2
    }

    private latexSemi(text: string): px {
        const widget = LatexWidget(text, this.$COLOR, this.$TEXT_PIXEL)
        const bounds = widget.getBounds()
        return bounds === null ? 0 : bounds.width / 2
    }

    private textSemi(text: string): px {
        return this.$TEXT_LATEX ?
            this.latexSemi(text) :
            this.plainSemi(text)
    }

    // dir

    public getDir(start: Point, end: Point): number {
        let A = this.toPx(start)
        let B = this.toPx(end)
        return dir(A, B)
    }

    public getCenterDir(point: Point): number {
        let C = this.$LABEL_CENTER[0]
        return this.getDir(C, point)
    }


    public getDirAngle(A: Point, O: Point, B: Point): number {
        let flip = this.polarFlip(A, O, B)
        let [P, Q] = flip ? [B, A] : [A, B]
        // draw like polar
        let a = this.getDir(O, P)
        let b = this.getDir(O, Q)
        return a <= b ? b - a : 360 + b - a
    }

    public getMidDir(A: Point, O: Point, B: Point): number {
        let flip = this.polarFlip(A, O, B)
        let [P, Q] = flip ? [B, A] : [A, B]

        // draw like polar
        let a1 = this.getDir(O, P)
        let a2 = this.getDir(O, Q)
        if (a2 < a1) a2 += 360
        return (a1 + a2) / 2
    }

    public getLineDir(A: Point, B: Point): number {
        let q = this.getDir(A, B)
        let mode = this.$LINE_LABEL
        if (mode === 'left') return q + 90
        if (mode === 'right') return q - 90
        let [a, b, c] = this.pjs([A, B, this.$LABEL_CENTER[0]])
        let right = IsReflex(a, b, c)
        return right ? q - 90 : q + 90
    }

    public polarFlip(A: Point, O: Point, B: Point): boolean {
        let [a, o, b] = this.pjs([A, O, B])
        return polarFlip(a, o, b, this.$ANGLE_MODE)
    }

    // other

    public unitize(text: string | number): string {
        text = String(text)
        let unit = this.$LENGTH_UNIT
        if (unit === '') return text

        if (this.$TEXT_LATEX) {
            return text + `~\\text{${unit}}`
        } else {
            return text + ' ' + unit
        }
    }


}






