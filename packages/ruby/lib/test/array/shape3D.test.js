import 'jest-extended';
import { Shape3D, shape3D } from '../../src/array/shape3D';
import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';
import { vector3D } from '../../src/array/vector3D';
import { shape2D } from '../../src/array/shape2D';
expect.extend({ toBeDeepCloseTo, toMatchCloseTo });
class SubShape3D extends Shape3D {
}
function it_preserve_original(func) {
    it('preserve original', () => {
        let shp = shape3D([1, 2, 3], [3, 4, 5], [5, 6, 7]);
        let clone = shape3D([1, 2, 3], [3, 4, 5], [5, 6, 7]);
        func(shp);
        expect(shp).toStrictEqual(clone);
    });
}
function it_propagate_subclass_type(func) {
    it('propagate subclass type', () => {
        let shp = new SubShape3D();
        shp.push(vector3D(1, 2, 3), vector3D(3, 4, 5), vector3D(5, 6, 7));
        expect(func(shp)).toBeInstanceOf(SubShape3D);
    });
}
function it_propagate_empty_shape3D(func) {
    it('propagate empty array', () => {
        let shp = shape3D();
        expect(func(shp)).toStrictEqual(shape3D());
    });
}
describe('toArray', () => {
    it('returns this as array', () => {
        expect(shape3D([1, 2, 3], [3, 4, 5]).toArray()).toStrictEqual([[1, 2, 3], [3, 4, 5]]);
    });
    it_preserve_original($ => $.toArray());
});
describe('projectTo2D', () => {
    it('return the projected 2D shape', () => {
        expect(shape3D([0, 0, 0], [3, 4, 5]).projectTo2D(60, 0.5))
            .toBeDeepCloseTo(shape2D([0, 0], [4, 6.732050807568877]));
        expect(shape3D([0, 0, 0], [3, 4, 5]).projectTo2D(40, 1))
            .toBeDeepCloseTo(shape2D([0, 0], [6.064177772475912, 7.571150438746157]));
        expect(shape3D([0, 0, 0], [3, 4, 5]).projectTo2D(90, 2))
            .toBeDeepCloseTo(shape2D([0, 0], [3, 13]));
    });
    it_preserve_original($ => $.projectTo2D(60, 0.5));
});
//# sourceMappingURL=shape3D.test.js.map