
/**
 * @ignore
 */
var PEN_QUALITY = 3;
globalThis.PEN_QUALITY = PEN_QUALITY

/**
 * @ignore
 */
class FrameCls {
    wPixel: number
    hPixel: number
    xmin: number
    xmax: number
    ymin: number
    ymax: number
    axisOffset: number

    constructor() {
        this.wPixel = 0; // total width in pixel
        this.hPixel = 0; // total height in pixel
        this.xmin = 0; // min x-coord
        this.xmax = 0; // max x-coord
        this.ymin = 0; // min y-coord
        this.ymax = 0; // max y-coord
        this.axisOffset = 5 * PEN_QUALITY;    // 5px;
    }
    xWidth(): number {
        // width in x-coord
        return this.xmax - this.xmin;
    }
    yHeight(): number {
        // height in y-coord
        return this.ymax - this.ymin;
    }
    xUnit(): number {
        // how many pixel is 1 x-unit
        return this.wPixel / this.xWidth();
    }
    yUnit(): number {
        // how many pixel is 1 y-unit
        return this.hPixel / this.yHeight();
    }
    toPix(xyArr: Point): Point {
        // [xCoord,yCoord] --> [xPixel,yPixel]
        const x = xyArr[0];
        const y = xyArr[1];
        const xPixel = (x - this.xmin) * this.xUnit();
        const yPixel = (this.ymax - y) * this.yUnit();
        return [xPixel, yPixel];
    }
    toCoord(xyArr: Point): Point {
        // [xPixel,yPixel] --> [xCoord,yCoord]
        const xPixel = xyArr[0];
        const yPixel = xyArr[1];
        const x = this.xmin + xPixel / this.xUnit();
        const y = this.ymax - yPixel / this.yUnit();
        return [x, y];
    }
    private _ticks(min: number, max: number, interval: number): number[] {
        // a pure function, return array of numbers at interval within [min,max]
        const start = Math.floor(min / interval) * interval;
        const arr = [];
        for (let i = start; i < max; i += interval) {
            i = parseFloat(i.toPrecision(3));
            if (i === 0 || i === min) continue;
            arr.push(i);
        }
        return arr;
    }
    xTicks(interval: number): number[] {
        // return tick array for x-axis, unit: coord
        return this._ticks(this.xmin, this.xmax, interval);
    }
    yTicks(interval: number): number[] {
        // return tick array for y-axis, unit: coord
        return this._ticks(this.ymin, this.ymax, interval);
    }
    xRange(): [number,number] {
        return [this.xmin, this.xmax];
    }
    yRange(): [number,number] {
        return [this.ymin, this.ymax];
    }
    xOffset(): number {
        // offset for x-axis, unit: coord
        return this.axisOffset / this.yUnit();
    }
    yOffset(): number {
        // offset for y-axis, unit: coord
        return this.axisOffset / this.xUnit();
    }
}

/**
 * @ignore
 */
var Frame = FrameCls
globalThis.Frame = Frame
