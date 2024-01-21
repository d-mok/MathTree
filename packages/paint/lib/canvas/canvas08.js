import { Canvas07 } from './canvas07.js';
const LABEL_OFFSET_PX = 20;
const X_MARK_OFFSET_PX = 15;
const Y_MARK_OFFSET_PX = 10;
const TICK_LENGTH_PX = 5;
/**
 * Return an array of ticks position at `interval` within `[min,max]`.
 * Zero is always a potential tick position.
 * ```
 * getTicks(2,10,3) // [3,6,9]
 * ```
 */
function getTicks(min, max, interval) {
    const start = Math.floor(min / interval) * interval;
    const arr = [];
    for (let i = start; i <= max; i += interval) {
        i = parseFloat(i.toPrecision(3));
        if (i === min)
            continue;
        if (i === max)
            continue;
        if (i === 0)
            continue;
        arr.push(i);
    }
    return arr;
}
/**
 * Handle:
 * - Axis
 */
export class Canvas08 extends Canvas07 {
    bottomEnd(x) {
        return this.$HALF_AXIS_Y ? [x, 0] : this.edgeBottom(x);
    }
    leftEnd(y) {
        return this.$HALF_AXIS_X ? [0, y] : this.edgeLeft(y);
    }
    xAxis() {
        let A = this.leftEnd(0);
        let B = this.edgeRight(0);
        this.arrow(A, B, 5);
    }
    yAxis() {
        let A = this.bottomEnd(0);
        let B = this.edgeTop(0);
        this.arrow(A, B, 5);
    }
    xAxisLabel(text) {
        this.save();
        this.$TEXT_ALIGN = 'right';
        this.$TEXT_BASELINE = 'middle';
        this.label(text, this.edgeRight(0), LABEL_OFFSET_PX, 120);
        this.restore();
    }
    yAxisLabel(text) {
        this.save();
        this.$TEXT_ALIGN = 'left';
        this.$TEXT_BASELINE = 'top';
        this.label(text, this.edgeTop(0), LABEL_OFFSET_PX, -30);
        this.restore();
    }
    xTicks(interval) {
        let min = this.$HALF_AXIS_X ? Math.max(0, this.xmin) : this.xmin;
        return getTicks(min, this.xmax, interval);
    }
    yTicks(interval) {
        let min = this.$HALF_AXIS_Y ? Math.max(0, this.ymin) : this.ymin;
        return getTicks(min, this.ymax, interval);
    }
    xAxisTick(interval) {
        for (let x of this.xTicks(interval)) {
            this.tickVert([x, 0], TICK_LENGTH_PX);
        }
    }
    yAxisTick(interval) {
        for (let y of this.yTicks(interval)) {
            this.tickHori([0, y], TICK_LENGTH_PX);
        }
    }
    xAxisTickMark(interval) {
        this.save();
        this.$TEXT_ITALIC = false;
        this.$TEXT_ALIGN = 'center';
        this.$TEXT_BASELINE = 'middle';
        for (let x of this.xTicks(interval)) {
            this.label(String(x), [x, 0], X_MARK_OFFSET_PX, 270);
        }
        this.restore();
    }
    yAxisTickMark(interval) {
        this.save();
        this.$TEXT_ITALIC = false;
        this.$TEXT_ALIGN = 'right';
        this.$TEXT_BASELINE = 'middle';
        for (let y of this.yTicks(interval)) {
            this.label(String(y), [0, y], Y_MARK_OFFSET_PX, 180);
        }
        this.restore();
    }
    gridLineVert(x) {
        let A = this.bottomEnd(x);
        let B = this.edgeTop(x);
        this.line([A, B]);
    }
    gridLineHori(y) {
        let A = this.leftEnd(y);
        let B = this.edgeRight(y);
        this.line([A, B]);
    }
    xAxisGrid(interval) {
        this.save();
        this.$COLOR = '#d3d5db';
        this.gridLineVert(0);
        for (let x of this.xTicks(interval)) {
            this.gridLineVert(x);
        }
        this.restore();
    }
    yAxisGrid(interval) {
        this.save();
        this.$COLOR = '#d3d5db';
        this.gridLineHori(0);
        for (let y of this.yTicks(interval)) {
            this.gridLineHori(y);
        }
        this.restore();
    }
}
//# sourceMappingURL=canvas08.js.map