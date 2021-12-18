import { px, inch } from '../global'
import { trimCanvas } from '../support/trim'

// The scale factor of canvas size for clearer image.
const QUALITY = 3

// The scale factor for width and height settings.
const INCH_SCALE = 10

// REM_PIXEL is the default font size of the browser, usually 16px
const REM_PIXEL: number = parseFloat(getComputedStyle(document.documentElement).fontSize)


function inchToPx(inch: inch): px {
    return inch * INCH_SCALE * REM_PIXEL
}

function pxToInch(px: px): inch {
    return px / INCH_SCALE / REM_PIXEL
}

/**
 * Handle:
 * - all canvas width and height issue
 * - save and restore canvas image
 * - exporting
 */
export class Canvas00 {

    protected canvas: HTMLCanvasElement = document.createElement('canvas');
    protected ctx: CanvasRenderingContext2D = this.canvas.getContext("2d")!;

    // size in pixel

    private reset() {
        this.ctx.scale(QUALITY, QUALITY)
        this.ctx.font = 'normal 10px Times New Roman'
    }

    protected get width(): px {
        return this.canvas.width / QUALITY
    }

    protected set width(value: px) {
        this.canvas.width = value * QUALITY
        this.reset()
    }

    protected get height(): px {
        return this.canvas.height / QUALITY
    }

    protected set height(value: px) {
        this.canvas.height = value * QUALITY
        this.reset()
    }

    // size in inch


    public get widthInch(): inch {
        return pxToInch(this.width)
    }

    public set widthInch(value: inch) {
        this.width = inchToPx(value)
    }

    public get heightInch(): inch {
        return pxToInch(this.height)
    }

    public set heightInch(value: inch) {
        this.height = inchToPx(value)
    }




    // image store

    private imgStore: ImageData | null = null


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

    public backgroundURL: string = ""


    public export(html: string, placeholder: string, trim: boolean): string {
        let cv = cloneCanvas(this.canvas)
        if (trim) trimCanvas(cv)

        const displayWidth = Math.floor(cv.width / QUALITY)
        const displayHeight = Math.floor(cv.height / QUALITY)

        const src = `src="${cv.toDataURL()}"`
        const width = ` width="${displayWidth}"`
        const height = ` height="${displayHeight}"`

        const bg = this.backgroundURL.length === 0 ?
            '' :
            ` style="background-image:url('${this.backgroundURL}');background-size:100% 100%;" `

        return html.replace(
            'src="' + placeholder + '"',
            src + width + height + bg
        )
    }

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
