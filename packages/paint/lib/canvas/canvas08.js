"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas08 = void 0;
const canvas07_1 = require("./canvas07");
const LABEL_OFFSET_PX = 15;
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
        if (i === min || i === max)
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
class Canvas08 extends canvas07_1.Canvas07 {
    xAxis() {
        let A = this.edgeLeft(0);
        let B = this.edgeRight(0);
        this.arrow(A, B, 5);
    }
    yAxis() {
        let A = this.edgeBottom(0);
        let B = this.edgeTop(0);
        this.arrow(A, B, 5);
    }
    xAxisLabel(text) {
        this.save();
        this.$TEXT_ALIGN = "right";
        this.$TEXT_BASELINE = "middle";
        this.label(text, this.edgeRight(0), LABEL_OFFSET_PX, 90);
        this.restore();
    }
    yAxisLabel(text) {
        this.save();
        this.$TEXT_ALIGN = "left";
        this.$TEXT_BASELINE = "top";
        this.label(text, this.edgeTop(0), LABEL_OFFSET_PX, 0);
        this.restore();
    }
    xTicks(interval) {
        return getTicks(this.xmin, this.xmax, interval);
    }
    yTicks(interval) {
        return getTicks(this.ymin, this.ymax, interval);
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
        this.$TEXT_ALIGN = "center";
        this.$TEXT_BASELINE = "middle";
        for (let x of this.xTicks(interval)) {
            this.label(String(x), [x, 0], X_MARK_OFFSET_PX, 270);
        }
        this.restore();
    }
    yAxisTickMark(interval) {
        this.save();
        this.$TEXT_ITALIC = false;
        this.$TEXT_ALIGN = "right";
        this.$TEXT_BASELINE = "middle";
        for (let y of this.yTicks(interval)) {
            this.label(String(y), [0, y], Y_MARK_OFFSET_PX, 180);
        }
        this.restore();
    }
    xAxisGrid(interval) {
        this.save();
        this.$COLOR = "#d3d5db";
        this.lineVert(0);
        for (let x of this.xTicks(interval)) {
            this.lineVert(x);
        }
        this.restore();
    }
    yAxisGrid(interval) {
        this.save();
        this.$COLOR = "#d3d5db";
        this.lineHori(0);
        for (let y of this.yTicks(interval)) {
            this.lineHori(y);
        }
        this.restore();
    }
}
exports.Canvas08 = Canvas08;
//# sourceMappingURL=canvas08.js.map