type px = number
type dot = [px, px]
type Point2D = [number, number]
type Point3D = [number, number, number]
type Point = Point2D | Point3D

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
}



// pixel conversion

function toPixelX(xmin: number, xmax: number, width: px, xCoord: number): px {
    return (xCoord - xmin) / (xmax - xmin) * width
}

function toPixelY(ymin: number, ymax: number, height: px, yCoord: number): px {
    return height - (yCoord - ymin) / (ymax - ymin) * height
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


function forceProj(point: Point, angle: number, depth: number): Point2D {
    return point.length === 3 ? proj(point, angle, depth) : point
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




// Const

const QUALITY = 3
const SIZE_SCALE = 10

/**
 * REM_PIXEL is the default font size of the browser, usually 16px
 */
const REM_PIXEL: number = parseFloat(getComputedStyle(document.documentElement).fontSize)


/**
 * handle all config
 */
export class BasicCanvas {

    protected canvas: HTMLCanvasElement = document.createElement('canvas');
    protected ctx: CanvasRenderingContext2D = this.canvas.getContext("2d")!;

    private imgStore: ImageData | null = null
    private states: state[] = []
    public backgroundURL: string = ""


    // coord

    public xmin: number = 0
    public xmax: number = 0
    public ymin: number = 0
    public ymax: number = 0

    public dx(): number {
        return this.xmax - this.xmin
    }

    public dy(): number {
        return this.ymax - this.ymin
    }

    public yxRatio(): number {
        return this.dy() / this.dx()
    }

    public center(): Point2D {
        let x = (this.xmin + this.xmax) / 2
        let y = (this.ymin + this.ymax) / 2
        return [x, y]
    }

    public edgeTop(x: number = 0): Point2D {
        return [x, this.ymax]
    }

    public edgeBottom(x: number = 0): Point2D {
        return [x, this.ymin]
    }

    public edgeLeft(y: number = 0): Point2D {
        return [this.xmin, y]
    }

    public edgeRight(y: number = 0): Point2D {
        return [this.xmax, y]
    }


    // size


    private reset() {
        this.ctx.scale(QUALITY, QUALITY)
        this.ctx.font = 'normal 10px Times New Roman'
    }

    public get width(): px {
        return this.canvas.width / QUALITY
    }

    public set width(value: px) {
        this.canvas.width = value * QUALITY
        this.reset()
    }

    public get height(): px {
        return this.canvas.height / QUALITY
    }

    public set height(value: px) {
        this.canvas.height = value * QUALITY
        this.reset()
    }

    // init

    public initRange(xRange: [number, number], yRange: [number, number]): void {
        this.xmin = xRange[0]
        this.xmax = xRange[1]
        this.ymin = yRange[0]
        this.ymax = yRange[1]
    }


    public initSize(width: number, height: number): void {
        this.width = width * SIZE_SCALE * REM_PIXEL
        this.height = height * SIZE_SCALE * REM_PIXEL
    }



    // border

    public setBorder(): void {
        const borderPix = this.$BORDER * SIZE_SCALE * REM_PIXEL
        let borderXUnit = (this.xmax - this.xmin) * borderPix / this.width
        let borderYUnit = (this.ymax - this.ymin) * borderPix / this.height

        this.xmin -= borderXUnit
        this.xmax += borderXUnit
        this.ymin -= borderYUnit
        this.ymax += borderYUnit

        this.width += 2 * borderPix
        this.height += 2 * borderPix
    }



    // // conversion

    public pj(point: Point): Point2D {
        return forceProj(point, this.$3D_ANGLE, this.$3D_DEPTH)
    }

    public pjs(points: Point[]): Point2D[] {
        return points.map($ => this.pj($))
    }


    protected toPx(point: Point): dot {
        let pt = this.pj(point)
        let [xCoord, yCoord] = pt
        let x = toPixelX(this.xmin, this.xmax, this.width, xCoord)
        let y = toPixelY(this.ymin, this.ymax, this.height, yCoord)
        return [x, y]
    }


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


    // user setting


    public $3D_ANGLE = 60
    public $3D_DEPTH = 0.5
    public $TEXT_DIR: number = 0
    public $TEXT_LATEX: boolean = false
    public $ANGLE_MODE: AngleMode = 'normal'
    public $LENGTH_UNIT: string = ''
    public $BORDER: number = 0.2
    public $LINE_LABEL: LineLabel = 'auto'


    private _$LABEL_CENTER: Point2D = this.center()

    public set $LABEL_CENTER(centers: Point[]) {
        // TEMP, true to be deleted
        let empty = centers.length === 0
        this._$LABEL_CENTER = empty ? this.center() : meanPoint(this.pjs(centers))
    }

    public get $LABEL_CENTER(): [Point2D] {
        return [this._$LABEL_CENTER]
    }



    // setting meta


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
            $LINE_LABEL: this.$LINE_LABEL
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
    }


    // image store



    public saveImg(): void {
        const w = this.canvas.width
        const h = this.canvas.height
        this.imgStore = this.ctx.getImageData(0, 0, w, h)
    }

    public restoreImg(): void {
        if (this.imgStore !== null)
            this.ctx.putImageData(this.imgStore, 0, 0)
    }


    public clearImg(): void {
        const w = this.canvas.width
        const h = this.canvas.height
        this.ctx.clearRect(0, 0, w, h)
    }


    // export



    public export(html: string, placeholder: string, trim: boolean): string {
        let cv = cloneCanvas(this.canvas)
        if (trim) trimCanvas(cv)

        const displayWidth = Math.floor(cv.width / QUALITY)
        const displayHeight = Math.floor(cv.height / QUALITY)

        const src = 'src="' + cv.toDataURL() + '"'
        const width = ' width="' + displayWidth + '"'
        const height = ' height="' + displayHeight + '"'

        const bg = this.backgroundURL.length === 0 ?
            '' :
            ` style="background-image:url('${this.backgroundURL}');background-size:100% 100%;" `

        return html.replace(
            'src="' + placeholder + '"',
            src + width + height + bg
        )
    }




}



function meanPoint(Points: Point2D[]): Point2D {
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




/**
 * Trim the canvas in-place.
 */
function trimCanvas(canvas: HTMLCanvasElement): void {

    function rowBlank(imageData: ImageData, width: number, y: number) {
        for (var x = 0; x < width; ++x) {
            if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false
        }
        return true
    }

    function columnBlank(imageData: ImageData, width: number, x: number, top: number, bottom: number) {
        for (var y = top; y < bottom; ++y) {
            if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false
        }
        return true
    }

    var ctx = canvas.getContext("2d")!
    var width = canvas.width
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    var top = 0, bottom = imageData.height, left = 0, right = imageData.width

    while (top < bottom && rowBlank(imageData, width, top)) ++top
    while (bottom - 1 > top && rowBlank(imageData, width, bottom - 1)) --bottom
    while (left < right && columnBlank(imageData, width, left, top, bottom)) ++left
    while (right - 1 > left && columnBlank(imageData, width, right - 1, top, bottom)) --right

    var trimmed = ctx.getImageData(left, top, right - left, bottom - top)
    canvas.width = trimmed.width
    canvas.height = trimmed.height
    ctx.putImageData(trimmed, 0, 0)
}




/**
 * Return a clone of the canvas.
 */
function cloneCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement {
    let oldCanvas = canvas
    //create a new canvas
    let newCanvas = document.createElement('canvas')
    let context = newCanvas.getContext('2d')!
    //set dimensions
    newCanvas.width = oldCanvas.width
    newCanvas.height = oldCanvas.height
    //apply the old canvas to the new one
    context.drawImage(oldCanvas, 0, 0)
    //return the new canvas
    return newCanvas
}
