"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const QUALITY = 3;
/**
 * Provide functions to operate on the canvas.
 */
class Board {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.imgStore = null;
        this.bgImgUrl = "";
    }
    init(width, height) {
        this.canvas.width = width * QUALITY;
        this.canvas.height = height * QUALITY;
        this.ctx.scale(QUALITY, QUALITY);
    }
    toDataUrl() {
        return this.canvas.toDataURL();
    }
    save() {
        const w = this.canvas.width;
        const h = this.canvas.height;
        this.imgStore = this.ctx.getImageData(0, 0, w, h);
    }
    restore() {
        if (this.imgStore !== null)
            this.ctx.putImageData(this.imgStore, 0, 0);
    }
    clear() {
        const w = this.canvas.width;
        const h = this.canvas.height;
        this.ctx.clearRect(0, 0, w, h);
    }
    trim() {
        function rowBlank(imageData, width, y) {
            for (var x = 0; x < width; ++x) {
                if (imageData.data[y * width * 4 + x * 4 + 3] !== 0)
                    return false;
            }
            return true;
        }
        function columnBlank(imageData, width, x, top, bottom) {
            for (var y = top; y < bottom; ++y) {
                if (imageData.data[y * width * 4 + x * 4 + 3] !== 0)
                    return false;
            }
            return true;
        }
        var ctx = this.canvas.getContext("2d");
        var width = this.canvas.width;
        var imageData = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        var top = 0, bottom = imageData.height, left = 0, right = imageData.width;
        while (top < bottom && rowBlank(imageData, width, top))
            ++top;
        while (bottom - 1 > top && rowBlank(imageData, width, bottom - 1))
            --bottom;
        while (left < right && columnBlank(imageData, width, left, top, bottom))
            ++left;
        while (right - 1 > left && columnBlank(imageData, width, right - 1, top, bottom))
            --right;
        var trimmed = ctx.getImageData(left, top, right - left, bottom - top);
        this.canvas.width = trimmed.width;
        this.canvas.height = trimmed.height;
        ctx.putImageData(trimmed, 0, 0);
    }
    clone() {
        let oldCanvas = this.canvas;
        //create a new canvas
        let newCanvas = document.createElement('canvas');
        let context = newCanvas.getContext('2d');
        //set dimensions
        newCanvas.width = oldCanvas.width;
        newCanvas.height = oldCanvas.height;
        //apply the old canvas to the new one
        context.drawImage(oldCanvas, 0, 0);
        //return the new canvas
        return new Board(newCanvas);
    }
    displayWidth() {
        return Math.floor(this.canvas.width / QUALITY);
    }
    displayHeight() {
        return Math.floor(this.canvas.height / QUALITY);
    }
    setBgImgUrl(url) {
        this.bgImgUrl = url;
    }
    bgAttr() {
        if (this.bgImgUrl.length === 0)
            return "";
        return ` style="background-image:url('${this.bgImgUrl}');background-size:100% 100%;" `;
    }
    export(html, placeholder, trim) {
        let clone = this.clone();
        if (trim)
            clone.trim();
        const src = 'src="' + clone.toDataUrl() + '"';
        const width = ' width="' + clone.displayWidth() + '"';
        const height = ' height="' + clone.displayHeight() + '"';
        return html.replace('src="' + placeholder + '"', src + width + height + clone.bgAttr());
    }
}
exports.Board = Board;
//# sourceMappingURL=Board.js.map