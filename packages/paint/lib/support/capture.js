"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thingsToPoints = void 0;
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
    return thing.length === 2
        && isPoint2D(thing[0])
        && typeof thing[1] === 'number';
}
function isSphere(thing) {
    return thing.length === 2
        && isPoint3D(thing[0])
        && typeof thing[1] === 'number';
}
function thingsToPoints(things) {
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
            pts.push(...getCircleCorners(...th));
            continue;
        }
        if (isSphere(th)) {
            pts.push(...getSphereCorners(...th));
            continue;
        }
    }
    return pts;
}
exports.thingsToPoints = thingsToPoints;
//# sourceMappingURL=capture.js.map