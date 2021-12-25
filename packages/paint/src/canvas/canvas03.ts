import { px, dot, Point2D, Point3D, Point, inch } from '../global'
import { Canvas02 } from './canvas02'


type AngleMode = 'normal' | 'polar' | 'reflex'
type LineLabel = 'auto' | 'left' | 'right'

type state = {
    $3D_ANGLE: number
    $3D_DEPTH: number
    $TEXT_DIR: number
    $TEXT_LATEX: boolean
    $LABEL_CENTER: [Point2D]
    $ANGLE_MODE: AngleMode
    $LENGTH_UNIT: string
    $BORDER: number
    $LINE_LABEL: LineLabel
    $HALF_AXIS_X: boolean
    $HALF_AXIS_Y: boolean
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


// REM_PIXEL is the default font size of the browser, usually 16px
const REM_PIXEL: number = parseFloat(getComputedStyle(document.documentElement).fontSize)


/**
 * Handle:
 * - Settings
 */
export class Canvas03 extends Canvas02 {

    // initialize state

    public AUTO_BORDER = false
    public RANGE_DONE = false
    public SIZE_DONE = false

    // native settings

    public get $WEIGHT(): number {
        return this.ctx.lineWidth
    }

    public set $WEIGHT(value: number) {
        this.ctx.lineWidth = value
    }

    public get $COLOR(): string {
        let c = this.ctx.fillStyle
        return typeof c === 'string' ? c : ''
    }

    public set $COLOR(value: string) {
        this.ctx.strokeStyle = value
        this.ctx.fillStyle = value
    }

    public get $ALPHA(): number {
        return this.ctx.globalAlpha
    }

    public set $ALPHA(value: number) {
        this.ctx.globalAlpha = value
    }

    public get $DASH(): px[] {
        return this.ctx.getLineDash()
    }

    public set $DASH(value: px[] | px | boolean) {
        let seg = segmentArray(value)
        this.ctx.setLineDash(seg)
    }

    public get $TEXT_ALIGN(): CanvasTextAlign {
        return this.ctx.textAlign
    }

    public set $TEXT_ALIGN(value: CanvasTextAlign) {
        this.ctx.textAlign = value
    }

    public get $TEXT_BASELINE(): CanvasTextBaseline {
        return this.ctx.textBaseline
    }

    public set $TEXT_BASELINE(value: CanvasTextBaseline) {
        this.ctx.textBaseline = value
    }

    public get $TEXT_PIXEL(): px {
        let match = this.ctx.font.match(/(\d+)px/)
        if (match === null) return NaN
        return Number.parseInt(match[1])
    }

    public set $TEXT_PIXEL(value: px) {
        value = Math.round(value)
        this.ctx.font = this.ctx.font.replace(/\d+px/g, value + 'px')
    }

    public get $TEXT_SIZE(): number {
        return this.$TEXT_PIXEL / REM_PIXEL
    }

    public set $TEXT_SIZE(value: number) {
        this.$TEXT_PIXEL = value * REM_PIXEL
    }


    public get $TEXT_ITALIC(): boolean {
        return this.ctx.font.includes('italic')
    }

    public set $TEXT_ITALIC(value: boolean) {
        this.ctx.font = this.ctx.font.replace('italic ', '')
        if (value) this.ctx.font = 'italic ' + this.ctx.font
    }


    // parent setting


    public get $3D_ANGLE(): number {
        return this.Proj_3D_Angle
    }

    public set $3D_ANGLE(value: number) {
        this.Proj_3D_Angle = value
    }

    public get $3D_DEPTH(): number {
        return this.Proj_3D_Depth
    }

    public set $3D_DEPTH(value: number) {
        this.Proj_3D_Depth = value
    }


    // user setting

    public $TEXT_DIR: number = 0
    public $TEXT_LATEX: boolean = false
    public $ANGLE_MODE: AngleMode = 'normal'
    public $LENGTH_UNIT: string = ''
    public $BORDER: inch = 0.2
    public $LINE_LABEL: LineLabel = 'auto'
    public $HALF_AXIS_X: boolean = false
    public $HALF_AXIS_Y: boolean = false


    private _$LABEL_CENTER: Point2D = this.center()

    public set $LABEL_CENTER(centers: Point[]) {
        let empty = centers.length === 0
        this._$LABEL_CENTER = empty ? this.center() : mid(this.pjs(centers))
    }

    public get $LABEL_CENTER(): [Point2D] {
        return [this._$LABEL_CENTER]
    }



    // setting meta

    private states: state[] = []


    public save() {
        this.ctx.save()
        this.states.push({
            $3D_ANGLE: this.$3D_ANGLE,
            $3D_DEPTH: this.$3D_DEPTH,
            $TEXT_DIR: this.$TEXT_DIR,
            $TEXT_LATEX: this.$TEXT_LATEX,
            $LABEL_CENTER: this.$LABEL_CENTER,
            $ANGLE_MODE: this.$ANGLE_MODE,
            $LENGTH_UNIT: this.$LENGTH_UNIT,
            $BORDER: this.$BORDER,
            $LINE_LABEL: this.$LINE_LABEL,
            $HALF_AXIS_X: this.$HALF_AXIS_X,
            $HALF_AXIS_Y: this.$HALF_AXIS_Y
        })
    }

    public restore() {
        this.ctx.restore()
        let state = this.states.pop()
        if (state === undefined) return
        this.$3D_ANGLE = state.$3D_ANGLE
        this.$3D_DEPTH = state.$3D_DEPTH
        this.$TEXT_DIR = state.$TEXT_DIR
        this.$TEXT_LATEX = state.$TEXT_LATEX
        this.$LABEL_CENTER = state.$LABEL_CENTER
        this.$ANGLE_MODE = state.$ANGLE_MODE
        this.$LENGTH_UNIT = state.$LENGTH_UNIT
        this.$BORDER = state.$BORDER
        this.$LINE_LABEL = state.$LINE_LABEL
        this.$HALF_AXIS_X = state.$HALF_AXIS_X
        this.$HALF_AXIS_Y = state.$HALF_AXIS_Y
    }


}



function mid(Points: Point2D[]): Point2D {
    if (Points.length === 0) return [0, 0]
    let X = 0
    let Y = 0
    for (let p of Points) {
        X += p[0]
        Y += p[1]
    }
    let n = Points.length
    return [X / n, Y / n]
}


