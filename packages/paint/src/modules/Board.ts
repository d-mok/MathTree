type pixel = number


/**
 * Provide functions to operate on the canvas.
 */
export class Board {

    constructor(
        private readonly canvas: HTMLCanvasElement
    ) { }



    private readonly ctx: CanvasRenderingContext2D = this.canvas.getContext("2d")!

    private readonly PEN_QUALITY = 3
    private imgStore: ImageData | null = null


    public init(width: pixel, height: pixel) {
        const Q = this.PEN_QUALITY
        this.canvas.width = width * Q
        this.canvas.height = height * Q
        this.ctx.scale(Q, Q)
    }



    public toDataUrl(): string {
        return this.canvas.toDataURL()
    }


    public save(): void {
        const w = this.canvas.width
        const h = this.canvas.height
        this.imgStore = this.ctx.getImageData(0, 0, w, h)
    }



    public restore(): void {
        if (this.imgStore !== null)
            this.ctx.putImageData(this.imgStore, 0, 0)
    }


    public clear(): void {
        const w = this.canvas.width
        const h = this.canvas.height
        this.ctx.clearRect(0, 0, w, h)
    }



    public trim(): void {

        function rowBlank(imageData: ImageData, width: number, y: number): boolean {
            for (var x = 0; x < width; ++x) {
                if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false
            }
            return true
        }

        function columnBlank(imageData: ImageData, width: number, x: number, top: number, bottom: number): boolean {
            for (var y = top; y < bottom; ++y) {
                if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false
            }
            return true
        }

        var ctx = this.canvas.getContext("2d")!
        var width = this.canvas.width
        var imageData = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
        var top = 0, bottom = imageData.height, left = 0, right = imageData.width

        while (top < bottom && rowBlank(imageData, width, top)) ++top
        while (bottom - 1 > top && rowBlank(imageData, width, bottom - 1)) --bottom
        while (left < right && columnBlank(imageData, width, left, top, bottom)) ++left
        while (right - 1 > left && columnBlank(imageData, width, right - 1, top, bottom)) --right

        var trimmed = ctx.getImageData(left, top, right - left, bottom - top)
        this.canvas.width = trimmed.width
        this.canvas.height = trimmed.height
        ctx.putImageData(trimmed, 0, 0)
    }


    public clone(): Board {
        let oldCanvas = this.canvas
        //create a new canvas
        let newCanvas = document.createElement('canvas')
        let context = newCanvas.getContext('2d')!
        //set dimensions
        newCanvas.width = oldCanvas.width
        newCanvas.height = oldCanvas.height
        //apply the old canvas to the new one
        context.drawImage(oldCanvas, 0, 0)
        //return the new canvas
        return new Board(newCanvas)
    }


    /**
     * Return the width in pixel for display, i.e. canvas.width / PEN_QUALITY
     */
    public displayWidth(): number {
        return Math.floor(this.canvas.width / this.PEN_QUALITY)
    }

    /**
     * Return the height in pixel for display, i.e. canvas.height / PEN_QUALITY
     */
    public displayHeight(): number {
        return Math.floor(this.canvas.height / this.PEN_QUALITY)
    }


}

