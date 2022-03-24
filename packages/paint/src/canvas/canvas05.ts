import { px, dot, Point2D, Point3D, Point, inch } from '../global'
import { Canvas04 } from './canvas04'




function sin(degree: number): number {
    return Math.sin(degree / 180 * Math.PI)
}


function cos(degree: number): number {
    return Math.cos(degree / 180 * Math.PI)
}



// CanvasLatex is a library that must be imported from script tag
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




function isAlphabet(_: string) {
    return _.length === 1 && (_.toLowerCase() !== _.toUpperCase())
}



/**
 * Handle:
 * - text basic
 */
export class Canvas05 extends Canvas04 {


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

    private text(text: string, point: Point, offset: dot) {
        let [x, y] = this.toPx(point)
        x += offset[0]
        y -= offset[1]
        this.textPx(text, [x, y])
    }

    // write in coord

    public write(text: string, point: Point) {
        this.text(text, point, [0, 0])
    }

    // label in coord

    private labelOffset(text: string, radius: px, dir: number): dot {
        let textWidth = this.textSemi(text)
        let extraX = this.$TEXT_ALIGN === 'center' ? (textWidth - 4) : 0
        let x = (radius + extraX) * cos(dir)
        let y = radius * sin(dir)
        return [x, y]
    }

    public label(text: string | number, point: Point, radius: px, dir: number) {
        text = String(text)
        let italic = this.$TEXT_ITALIC
        if (isAlphabet(text))
            this.$TEXT_ITALIC = true
        let offset = this.labelOffset(text, radius, dir)
        this.text(text, point, offset)
        this.$TEXT_ITALIC = italic
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



}




