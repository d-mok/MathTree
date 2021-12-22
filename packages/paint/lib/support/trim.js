function getAlpha(img, x, y) {
    let i = 0;
    i += y * img.width;
    i += x;
    return img.data[4 * i + 3];
}
function isPainted(img, x, y) {
    return getAlpha(img, x, y) !== 0;
}
function rowBlank(img, y) {
    for (let x = 0; x < img.width; x++) {
        if (isPainted(img, x, y))
            return false;
    }
    return true;
}
function colBlank(img, x) {
    for (let y = 0; y < img.height; y++) {
        if (isPainted(img, x, y))
            return false;
    }
    return true;
}
function trimCanvasX(canvas) {
    let ctx = canvas.getContext("2d");
    let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let top = 0;
    let bottom = img.height - 1;
    while (top < bottom && rowBlank(img, top))
        top++;
    while (bottom > top && rowBlank(img, bottom))
        bottom--;
    let trimmed = ctx.getImageData(0, top, img.width, bottom - top + 1);
    canvas.width = trimmed.width;
    canvas.height = trimmed.height;
    ctx.putImageData(trimmed, 0, 0);
}
function trimCanvasY(canvas) {
    let ctx = canvas.getContext("2d");
    let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let left = 0;
    let right = img.width - 1;
    while (left < right && colBlank(img, left))
        left++;
    while (right > left && colBlank(img, right))
        right--;
    let trimmed = ctx.getImageData(left, 0, right - left + 1, img.height);
    canvas.width = trimmed.width;
    canvas.height = trimmed.height;
    ctx.putImageData(trimmed, 0, 0);
}
export function trimCanvas(canvas) {
    trimCanvasX(canvas);
    trimCanvasY(canvas);
}
//# sourceMappingURL=trim.js.map