import { Linear } from '../linear'




describe('Linear class', () => {

    it('by linear', () => {
        let lin = (new Linear()).byLinear([1, 2, 3])

        expect(lin.toLinear()).toStrictEqual([1, 2, 3])
        expect(lin.toLine()).toStrictEqual([-0.5, -1.5])
        expect(lin.toStandard()).toStrictEqual([1, 2, -3])
        expect(lin.toConstraint('>')).toStrictEqual([1, 2, '>', -3])
        expect(lin.xInt()).toBe(-3)
        expect(lin.yInt()).toBe(-1.5)
    })


    it('by standard', () => {
        let lin = (new Linear()).byStandard([1, 2, -3])

        expect(lin.toLinear()).toStrictEqual([1, 2, 3])
        expect(lin.toLine()).toStrictEqual([-0.5, -1.5])
        expect(lin.toStandard()).toStrictEqual([1, 2, -3])
        expect(lin.toConstraint('>')).toStrictEqual([1, 2, '>', -3])

    })



    it('by two points', () => {
        let lin = (new Linear()).byTwoPoints([1, -2], [-3, 0])

        expect(lin.toLinear()).toStrictEqual([1, 2, 3])
        expect(lin.toLine()).toStrictEqual([-0.5, -1.5])
        expect(lin.toStandard()).toStrictEqual([1, 2, -3])
        expect(lin.toConstraint('>')).toStrictEqual([1, 2, '>', -3])


        lin = (new Linear()).byTwoPoints([1, 2], [1, 2])
        expect(lin.toLinear()).toStrictEqual([NaN, NaN, NaN])

    })



    it('by point slope', () => {
        let lin = (new Linear()).byPointSlope([1, -2], -0.5)

        expect(lin.toLinear()).toStrictEqual([1, 2, 3])
        expect(lin.toLine()).toStrictEqual([-0.5, -1.5])
        expect(lin.toStandard()).toStrictEqual([1, 2, -3])
        expect(lin.toConstraint('>')).toStrictEqual([1, 2, '>', -3])

    })




    it('by intercepts', () => {
        let lin = (new Linear()).byIntercepts(-3, -1.5)

        expect(lin.toLinear()).toStrictEqual([1, 2, 3])
        expect(lin.toLine()).toStrictEqual([-0.5, -1.5])
        expect(lin.toStandard()).toStrictEqual([1, 2, -3])
        expect(lin.toConstraint('>')).toStrictEqual([1, 2, '>', -3])



        lin = (new Linear()).byIntercepts(0, 1)
        expect(lin.toLinear()).toStrictEqual([NaN, NaN, NaN])
    })



    it('by bisector', () => {
        let lin = (new Linear()).byBisector([0, 1], [-2, -3])

        expect(lin.toLinear()).toStrictEqual([1, 2, 3])
        expect(lin.toLine()).toStrictEqual([-0.5, -1.5])
        expect(lin.toStandard()).toStrictEqual([1, 2, -3])
        expect(lin.toConstraint('>')).toStrictEqual([1, 2, '>', -3])



        lin = (new Linear()).byBisector([1, 2], [1, 2])
        expect(lin.toLinear()).toStrictEqual([NaN, NaN, NaN])
    })



    it('handles vertical line', () => {
        let lin = (new Linear()).byLinear([1, 0, -1])

        expect(lin.toLinear()).toStrictEqual([1, 0, -1])
        expect(lin.toLine()).toStrictEqual([NaN, NaN])
        expect(lin.toStandard()).toStrictEqual([1, 0, 1])
        expect(lin.toConstraint('>')).toStrictEqual([1, 0, '>', 1])

    })


    it('handles horizontal line', () => {
        let lin = (new Linear()).byLinear([0, 1, -1])

        expect(lin.toLinear()).toStrictEqual([0, 1, -1])
        expect(lin.toLine()).toStrictEqual([-0, 1])
        expect(lin.toStandard()).toStrictEqual([0, 1, 1])
        expect(lin.toConstraint('>')).toStrictEqual([0, 1, '>', 1])

    })



    it('handles undefined', () => {
        let lin = (new Linear())

        expect(lin.toLinear()).toStrictEqual([NaN, NaN, NaN])
        expect(lin.toLine()).toStrictEqual([NaN, NaN])
        expect(lin.toStandard()).toStrictEqual([NaN, NaN, NaN])
        expect(lin.toConstraint('>')).toStrictEqual([NaN, NaN, '>', NaN])

    })




});