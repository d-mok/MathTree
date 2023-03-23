import { crammer } from '../math/cal';
import * as INEQUAL from '../math/inequal';
/**
 * Check if this constraint contains `point`.
 */
export function contains([a, b, i, c], point, mode = 'self') {
    let [x, y] = point;
    switch (mode) {
        case 'self':
            return INEQUAL.compare(a * x + b * y, i, c);
        case 'strict':
            return contains(strict([a, b, i, c]), point, 'self');
        case 'loose':
            return contains(loose([a, b, i, c]), point, 'self');
    }
}
/**
 * Check if me can equal.
 */
export function canEqual([a, b, i, c]) {
    return INEQUAL.canEqual(i);
}
/**
 * Return a strict version of this constraint.
 */
export function strict([a, b, i, c]) {
    let j = INEQUAL.strict(i);
    return [a, b, j, c];
}
/**
 * Return a loose version of this constraint.
 */
export function loose([a, b, i, c]) {
    let j = INEQUAL.loose(i);
    return [a, b, j, c];
}
/**
 * Return a flipped version of this constraint.
 */
export function flip([a, b, i, c]) {
    let j = INEQUAL.flip(i);
    return [a, b, j, c];
}
/**
 * Return the intersection point of this and `another`.
 * If parallel, return `undefined`.
 */
export function intersectWith([a1, b1, i1, c1], [a2, b2, i2, c2]) {
    if (a1 / b1 === a2 / b2)
        return undefined;
    return crammer(a1, b1, c1, a2, b2, c2);
}
/**
 * Return Linear form object from constraint.
 */
export function toLinear([a, b, i, c]) {
    return [a, b, -c];
}
/**
 * Return Standard form object from constraint.
 */
export function toStandard([a, b, i, c]) {
    return [a, b, c];
}
//# sourceMappingURL=rein.js.map