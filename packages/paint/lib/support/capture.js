function getCircleCorners(center, radius) {
    let [h, k] = center;
    let r = radius;
    return [
        [h + r, k + r],
        [h + r, k - r],
        [h - r, k + r],
        [h - r, k - r]
    ];
}
function getSphereCorners(center, radius) {
    let [a, b, c] = center;
    let r = radius;
    return [
        [a + r, b + r, c + r],
        [a + r, b + r, c - r],
        [a + r, b - r, c + r],
        [a + r, b - r, c - r],
        [a - r, b + r, c + r],
        [a - r, b + r, c - r],
        [a - r, b - r, c + r],
        [a - r, b - r, c - r],
    ];
}
function getQuadraticCorners(a, b, c, scale) {
    // scale = 1 -> horizontal extension by the focus
    let f = (x) => a * x * x + b * x + c;
    let h = -b / (2 * a);
    let k = f(h);
    let V = [h, k];
    let dx = 1 / (2 * a);
    let Dx = dx * scale;
    let A = [h + Dx, f(h + Dx)];
    let B = [h - Dx, f(h - Dx)];
    return [A, B, V];
}
function isPoint2D(thing) {
    return Array.isArray(thing)
        && thing.length === 2
        && typeof thing[0] === 'number'
        && typeof thing[1] === 'number';
}
function isPoint3D(thing) {
    return Array.isArray(thing)
        && thing.length === 3
        && typeof thing[0] === 'number'
        && typeof thing[1] === 'number'
        && typeof thing[2] === 'number';
}
function isCircle(thing) {
    return Array.isArray(thing)
        && thing.length === 3
        && thing[0] === 'circle'
        && isPoint2D(thing[1])
        && typeof thing[2] === 'number';
}
function isSphere(thing) {
    return Array.isArray(thing)
        && thing.length === 3
        && thing[0] === 'sphere'
        && isPoint3D(thing[1])
        && typeof thing[2] === 'number';
}
function isQuadratic(thing) {
    return Array.isArray(thing)
        && thing.length === 5
        && thing[0] === 'quadratic'
        && typeof thing[1] === 'number'
        && typeof thing[2] === 'number'
        && typeof thing[3] === 'number'
        && typeof thing[4] === 'number';
}
export function thingsToPoints(things) {
    let pts = [];
    for (let th of things) {
        if (isPoint2D(th)) {
            pts.push(th);
            continue;
        }
        if (isPoint3D(th)) {
            pts.push(th);
            continue;
        }
        if (isCircle(th)) {
            let [type, C, r] = th;
            pts.push(...getCircleCorners(C, r));
            continue;
        }
        if (isSphere(th)) {
            let [type, C, r] = th;
            pts.push(...getSphereCorners(C, r));
            continue;
        }
        if (isQuadratic(th)) {
            let [type, a, b, c, scale] = th;
            pts.push(...getQuadraticCorners(a, b, c, scale));
            continue;
        }
        throw 'Unrecognized capture: ' + JSON.stringify(th);
    }
    return pts;
}
//# sourceMappingURL=capture.js.map