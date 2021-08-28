

import { repeat } from '../Jest/JestExtend'



test('RndShake', () => {
    expect(RndShake('\\ge')).toSatisfyAll(owl.ineq);
    expect(RndShake(5)).toSatisfyAll(owl.int);
    expect(RndShake(0.5)).toSatisfyAll(owl.prob);
    expect(RndShake(1.5)).toSatisfyAll(owl.positive);
});






test('RndShakeN', () => {
    function run(anchor: number, min: number, max: number, distinct = max - min) {
        let shaked = RndShakeN(anchor)
        expect(shaked).toAllBeBetween(min, max)
        expect(shaked).toAllBeInteger()
        expect(shaked).toBeDupless()
        expect(shaked).toHaveLength(3)
        expect(() => RndShakeN(anchor)).toSpanLength(distinct, 1)
    }


    repeat(100, () => {
        run(5, 2, 8);
        run(-5, -8, -2);
        run(2, 1, 5);
        run(1, 2, 4, 3);
        run(-2, -5, -1);
        run(0, 1, 3, 3);
        run(-1, -4, -2, 3);
        run(100, 101, 110, 10);
        run(456, 411, 501);
    })


    repeat(100, () => {
        RndShakeN(RndN(-1000, 1000));
    })

});



test('RndShakeR', () => {
    function run(anchor: number, min: number, max: number) {
        let shaked = RndShakeR(anchor)
        expect(shaked).toAllBeBetween(min, max)
        expect(shaked).toBeDupless()
        expect(shaked).toHaveLength(3)
        expect(() => RndShakeR(anchor)).toSpanRange(min, max, 1)
    }


    repeat(100, () => {
        run(3.5, 1.8, 5.2);
        run(1.5, 1, 2.3);
        run(-1.5, -2.3, -1);
        run(123.45, 100, 185.17);
        run(900.1, 450.1, 999.9);
        run(4.567e-20, 2.284e-20, 6.850e-20);
        run(-4.567e-20, -6.850e-20, -2.284e-20);
    })

    repeat(100, () => {
        RndShakeR(RndR(-1000, 1000));
        RndShakeR(RndR(-1, 1));
    })


});



test('RndShakeQ', () => {

    function run(anchor: number, isPositive: boolean, isProb: boolean) {

        let shaked = RndShakeQ(anchor)
        if (isPositive) {
            expect(shaked).toSatisfyAll($ => $ > 0);
        } else {
            expect(shaked).toSatisfyAll($ => $ < 0);
        }
        expect(shaked).toHaveLength(3);
        expect(shaked).toSatisfyAll(owl.rational);
        if (isProb)
            expect(shaked).toSatisfyAll($ => $ >= 0 && $ <= 1);
    }


    repeat(100, () => {
        run(5 / 6, true, true);
        run(6 / -5, false, false);
    })


});



// test('RndShakeDfrac', () => {
//     function run(anchor:number, isPositive) {
//         let arr = sample(() => RndShakeDfrac(anchor));
//         let arr0 = arr.flat(2).map(x => ink.parseDfrac(x)[0]);
//         let arr1 = arr.flat(2).map(x => ink.parseDfrac(x)[1]);
//         expect(arr0).toBeFlatIsInteger();
//         expect(arr1).toBeFlatIsInteger();
//         if (isPositive) {
//             expect(arr0).toBeFlatIs(x => x > 0);
//         } else {
//             expect(arr0).toBeFlatIs(x => x < 0);
//         }
//         expect(arr1).toBeFlatIs(x => x > 1);
//         expect(arr).toAllHaveLength(3);
//     }
//     run('\\dfrac{5}{6}', true);
//     run('\\dfrac{6}{-5}', false);
// });



test('RndShakeIneq', () => {

    repeat(10, () => {
        let shaked = RndShakeIneq('\\ge')
        expect(shaked).toSpanSame(['\\ge', '\\le']);
        expect(shaked).toHaveLength(3);
        expect(shaked.filter($ => $ === '\\ge')).toHaveLength(1);
        expect(shaked.filter($ => $ === '\\le')).toHaveLength(2);
    })

    repeat(10, () => {
        let shaked = RndShakeIneq('\\lt')
        expect(shaked).toSpanSame(['\\gt', '\\lt']);
        expect(shaked).toHaveLength(3);
        expect(shaked.filter($ => $ === '\\lt')).toHaveLength(1);
        expect(shaked.filter($ => $ === '\\gt')).toHaveLength(2);
    })

});




test('RndShakePoint', () => {

    function run(anchor: Point2D, isXPositive: boolean, isYPositive: boolean) {

        let shaked = RndShakePoint(anchor)
        let xs = shaked.map(([x, y]) => x)
        let ys = shaked.map(([x, y]) => y)

        expect(xs).toAllBeInteger()
        expect(ys).toAllBeInteger()

        if (isXPositive) {
            expect(xs).toSatisfyAll(x => x > 0);
        } else {
            expect(xs).toSatisfyAll(x => x < 0);
        }

        if (isYPositive) {
            expect(ys).toSatisfyAll(x => x > 0);
        } else {
            expect(ys).toSatisfyAll(x => x < 0);
        }

        expect(shaked).toHaveLength(3);

    }


    repeat(10, () => {
        run([5, 6], true, true);
        run([6, -5], true, false);
        run([-3, 12], false, true);
        run([-3, -12], false, false);
    })


});




test('RndShakeCombo', () => {

    function run(anchor: [boolean, boolean, boolean]) {
        let shaked = RndShakeCombo(anchor)
        expect(shaked).toSatisfyAll(owl.combo);
        expect(shaked).toHaveLength(3);
    }


    repeat(10, () => {
        run([true, true, true]);
    })

});



test('RndShakeTrig', () => {

    function run(anchor: TrigFunc) {
        let shaked = RndShakeTrig(anchor)
        expect(shaked).toSatisfyAll(owl.trig);
        expect(shaked).toHaveLength(3);
    }


    repeat(10, () => {
        run('sin');
    })


});



test('RndShakeTrigValue', () => {

    function run(anchor: TrigValue) {
        let shaked = RndShakeTrigValue(anchor)
        expect(shaked).toSatisfyAll(owl.trigValue);
        expect(shaked).toHaveLength(3);
    }

    repeat(10, () => {
        run(['sin', 'x']);
    })

});



test('RndShakeRatio', () => {

    function run(anchor: number[]) {
        let shaked = RndShakeRatio(anchor)
        expect(shaked).toSatisfyAll(owl.ntuple);
        expect(shaked).toHaveLength(3);
    }

    repeat(10, () => {
        run([4, 5, 6]);
    })

});


test('RndShakeBase', () => {

    function run(anchor: string) {
        let shaked = RndShakeBase(anchor)
        expect(shaked).toSatisfyAll(owl.base);
        expect(shaked).toHaveLength(3);
    }

    repeat(10, () => {
        run('AB0CD_{16}');
    })

});


test('RndShakePolarPoint', () => {

    function run(anchor: PolarPoint) {
        let shaked = RndShakePolarPoint(anchor)
        expect(shaked).toSatisfyAll(owl.point2D);
        expect(shaked).toSatisfyAll(([r, q]) => Number.isInteger(cal.blur(r ** 2)));
        expect(shaked).toSatisfyAll(([r, q]) => [30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330].includes(q));
        expect(shaked).toHaveLength(3);
    }

    repeat(10, () => {
        run([3, 60]);
    })

});
