type pixel = number
type dot = [pixel, pixel]

/**
 * Provide functions to control the state of the ctx.
 */
export class Dial {

    constructor(
        protected readonly ctx: CanvasRenderingContext2D
    ) { }

    // settings

    public setWeight(weight = 1): void {
        this.ctx.lineWidth = weight
    }

    public setStrokeColor(color = "black"): void {
        this.ctx.strokeStyle = color
    }

    public setFillColor(color = "black"): void {
        this.ctx.fillStyle = color
    }

    public setColor(color = "black"): void {
        this.setStrokeColor(color)
        this.setFillColor(color)
    }

    public setAlpha(opaque = 1): void {
        this.ctx.globalAlpha = opaque
    }

    public setDash(segments: (pixel[] | pixel | boolean) = []): void {
        if (Array.isArray(segments))
            this.ctx.setLineDash(segments)
        if (typeof segments === 'number')
            this.setDash([segments, segments])
        if (typeof segments === 'boolean')
            this.setDash(segments ? [5, 5] : [])
    }

    public setTextAlign(align: CanvasTextAlign = "center"): void {
        this.ctx.textAlign = align
    }

    public setTextBaseline(baseline: CanvasTextBaseline = "middle"): void {
        this.ctx.textBaseline = baseline
    }

    public setTextPixel(pixel: pixel): void {
        pixel = Math.round(pixel)
        this.ctx.font = this.ctx.font.replace(/\d+px/g, pixel + 'px')
    }

    public setTextItalic(italic = false): void {
        if (italic) {
            if (!this.getTextItalic())
                this.ctx.font = 'italic ' + this.ctx.font
        } else {
            this.ctx.font = this.ctx.font.replace('italic ', '')
        }
    }

    // getters

    public getTextPixel(): pixel {
        let match = this.ctx.font.match(/(\d+)px/)
        if (match === null) return NaN
        return Number.parseInt(match[1])
    }

    public getTextItalic(): boolean {
        return this.ctx.font.includes('italic')
    }

    // meta

    public save(): void {
        this.ctx.save()
    }

    public restore(): void {
        this.ctx.restore()
    }

    // transform

    public translate(x: pixel, y: pixel): void {
        this.ctx.translate(x, y)
    }

    public translateTo(dot: dot): void {
        let [x, y] = dot
        this.ctx.translate(x, y)
    }

    public rotate(degreePolar: number): void {
        this.ctx.rotate(-degreePolar * Math.PI / 180)
    }

    public rotateAlong(start: dot, end: dot): void {
        let [x1, y1] = start
        let [x2, y2] = end
        let dx = x2 - x1
        let dy = y2 - y1
        let q = Math.atan2(dy, dx)
        this.ctx.rotate(q)
    }

}