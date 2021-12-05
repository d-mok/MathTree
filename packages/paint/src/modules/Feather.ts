
type pixel = number
type dot = [pixel, pixel]

import { Dial } from './Dial'


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

function latexTuneX(x: number, width: number, textAlign: CanvasTextAlign): number {
    if (textAlign === 'left') return - x
    if (textAlign === 'right') return - x - width
    if (textAlign === 'center') return - x - width / 2
    return - x - width / 2
}

function latexTuneY(y: number, height: number, textBaseline: CanvasTextBaseline): number {
    if (textBaseline === 'top') return - y
    if (textBaseline === 'bottom') return - y - height
    if (textBaseline === 'middle') return - y - height / 2
    return - y / 2
}



/**
 * Provide writing function in terms of pixel.
 */
export class Feather {

    constructor(
        private readonly ctx: CanvasRenderingContext2D
    ) { }

    private dial: Dial = new Dial(this.ctx)


    // text

    private writePlain(text: string, dot: dot, dir: number) {
        text = String(text)
        if (text === '') return
        this.dial.save()
        this.dial.translateTo(dot)
        this.dial.rotate(dir)
        this.ctx.fillText(text, 0, 0)
        this.dial.restore()
    }


    private getLatexWidget(text: string) {
        let color = this.ctx.fillStyle
        if (typeof color !== 'string')
            color = 'black'
        let size = this.dial.getTextPixel()
        return LatexWidget(text, color, size)
    }



    private writeLatex(text: string, dot: dot, dir: number) {
        text = String(text)
        if (text === '') return

        const widget = this.getLatexWidget(text)
        const bounds = widget.getBounds()

        if (bounds === null) {
            console.error('[CanvasLatex] bounds === null! This is an unexpected error.')
            return
        }

        this.dial.save()
        this.dial.translateTo(dot)
        this.dial.rotate(dir)
        let xTune = latexTuneX(bounds.x, bounds.width, this.ctx.textAlign)
        let yTune = latexTuneY(bounds.y, bounds.height, this.ctx.textBaseline)
        this.dial.translate(xTune, yTune)
        widget.draw(this.ctx)
        this.dial.restore()
    }

    write(text: string, dot: dot, dir: number, latex: boolean) {
        if (latex) {
            this.writeLatex(text, dot, dir)
        } else {
            this.writePlain(text, dot, dir)
        }
    }

    // text width

    private getPlainTextHalfWidth(text: string): pixel {
        return this.ctx.measureText(text).width / 2
    }

    private getLatexHalfWidth(text: string): pixel {
        const widget = this.getLatexWidget(text)
        const bounds = widget.getBounds()
        if (bounds === null) return 0
        return bounds.width / 2
    }

    getHalfWidth(text: string, latex: boolean): pixel {
        return latex ?
            this.getLatexHalfWidth(text) :
            this.getPlainTextHalfWidth(text)
    }



}

