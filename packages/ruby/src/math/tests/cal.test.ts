import * as cal from '../cal'
import 'jest-extended'
import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';
expect.extend({ toBeDeepCloseTo, toMatchCloseTo });





describe('blur', () => {
    const cases = [
        [0.1 + 0.2, 0.3],
        [0.81 - 1, -0.19],  //-0.18999999999999995
        [1.1 ** 2, 1.21],  //1.2100000000000002
        [0.123000001000001, 0.123000001],
        [0.123000000100001, 0.123000000100001],
    ]
    it.each(cases)('blur(%p)', (num, expected) => {
        expect(cal.blur(num)).toBe(expected);
    });
});


describe('correct', () => {
    const cases = [
        [0.1 + 0.2, 0.3],
        [0.81 - 1, -0.19],  //-0.18999999999999995
        [1.1 ** 2, 1.21],  //1.2100000000000002
    ]
    it.each(cases)('correct(%p)', (num, expected) => {
        expect(cal.correct(num)).toBe(expected);
    });
});



describe('eq', () => {
    const trueCases = [
        [0.1 + 0.2, 0.3],
        [0.81 - 1, -0.19],  //-0.18999999999999995
        [1.1 ** 2, 1.21],  //1.2100000000000002
    ]
    it.each(trueCases)('correct(%p)', (a, b) => {
        expect(cal.eq(a, b)).toBeTrue();
    });

    const falseCases = [
        [0.1 + 0.2, 0.300000000001],
        [0.81 - 1, -0.190000000001], //-0.18999999999999995
        [1.1 ** 2, 1.20999999999], //1.2100000000000002
    ]
    it.each(falseCases)('correct(%p)', (a, b) => {
        expect(cal.eq(a, b)).toBeFalse();
    });
});




describe('sigfig dp', () => {
    const cases = [
        [1, 1, 0],
        [12, 2, 0],
        [123, 3, 0],
        [123.4, 4, 1],
        [123.45, 5, 2],
        [123.456, 6, 3],
        [0.123, 3, 3],
        [0.00123, 3, 5],
        [0.00001230123, 7, 11],
        [10, 1, 0],
        [1200, 2, 0],
        [1200.0001, 8, 4],
        [1200.0001000, 8, 4],
        [-1200.0001, 8, 4],
        [0.81 - 1, 17, 17], //-0.18999999999999995
        [1.1 ** 2, 17, 16], //1.2100000000000002
    ]
    it.each(cases)('sigfig dp(%p)', (num, sf, dp) => {
        expect(cal.sigfig(num)).toBe(sf);
        expect(cal.dp(num)).toBe(dp);
    });
});





describe('round', () => {
    const cases = [
        [123.4567, 1, 100, 200, 100],
        [123.4567, 2, 120, 130, 120],
        [123.4567, 3, 123, 124, 123],
        [123.4567, 4, 123.5, 123.5, 123.4],
        [123.4567, 5, 123.46, 123.46, 123.45],
        [123.4567, 6, 123.457, 123.457, 123.456],
        [123.4567, 7, 123.4567, 123.4567, 123.4567],
        [123.4567, 8, 123.4567, 123.4567, 123.4567],
        [1.005, 1, 1, 2, 1],
        [1.005, 2, 1, 1.1, 1],
        [1.005, 3, 1.01, 1.01, 1],
        [1.005, 4, 1.005, 1.005, 1.005],
        [1.005, 5, 1.005, 1.005, 1.005],
        [1.555, 1, 2, 2, 1],
        [1.555, 2, 1.6, 1.6, 1.5],
        [1.555, 3, 1.56, 1.56, 1.55],
        [1.555, 4, 1.555, 1.555, 1.555],
        [1.555, 5, 1.555, 1.555, 1.555],
        [123.9999, 5, 124, 124, 123.99],
        [-123.4567, 3, -123, -124, -123],
        [-123.4567, 4, -123.5, -123.5, -123.4],
        [0, 1, 0, 0, 0],
        [0, 2, 0, 0, 0],
        [1.23455e-30, 5, 1.2346e-30, 1.2346e-30, 1.2345e-30],
        [123.0001, 5, 123, 123.01, 123],
        [0.1 + 0.2, 1, 0.3, 0.4, 0.3],
        [0.81 - 1, 5, -0.19, -0.19, -0.18999],
        [1.2345e-30, 5, 1.2345e-30, 1.2345e-30, 1.2345e-30],
    ];
    it.each(cases)('round(%p,%p)', (num, sf, off, up, down) => {
        expect(cal.round(num, sf).off()).toBe(off);
        expect(cal.round(num, sf).up()).toBe(up);
        expect(cal.round(num, sf).down()).toBe(down);
    });
});





describe('fix', () => {
    const cases = [
        [123.4567, -2, 100, 200, 100],
        [123.4567, -1, 120, 130, 120],
        [123.4567, 0, 123, 124, 123],
        [123.4567, 1, 123.5, 123.5, 123.4],
        [123.4567, 2, 123.46, 123.46, 123.45],
        [123.4567, 3, 123.457, 123.457, 123.456],
        [123.4567, 4, 123.4567, 123.4567, 123.4567],
        [123.4567, 5, 123.4567, 123.4567, 123.4567],
        [1.005, -1, 0, 10, 0],
        [1.005, 0, 1, 2, 1],
        [1.005, 1, 1, 1.1, 1],
        [1.005, 2, 1.01, 1.01, 1],
        [1.005, 3, 1.005, 1.005, 1.005],
        [1.005, 4, 1.005, 1.005, 1.005],
        [1.555, -1, 0, 10, 0],
        [1.555, 0, 2, 2, 1],
        [1.555, 1, 1.6, 1.6, 1.5],
        [1.555, 2, 1.56, 1.56, 1.55],
        [1.555, 3, 1.555, 1.555, 1.555],
        [1.555, 4, 1.555, 1.555, 1.555],
        [123.9999, 2, 124, 124, 123.99],
        [1.35499999999, 2, 1.35, 1.36, 1.35],
        [-123.4567, 0, -123, -124, -123],
        [-123.4567, 1, -123.5, -123.5, -123.4],
        [-0.5, 0, -1, -1, -0],
        [0, 1, 0, 0, 0],
        [0, 2, 0, 0, 0],
        [1.23455E-30, 34, 1.2346E-30, 1.2346E-30, 1.2345E-30],
        [123.0001, 2, 123, 123.01, 123],
        [0.1 + 0.2, 1, 0.3, 0.4, 0.3],
        [0.81 - 1, 5, -0.19, -0.19, -0.18999],
        [1.2345E-30, 34, 1.2345E-30, 1.2345E-30, 1.2345E-30],
    ];
    it.each(cases)('fix(%p,%p)', (num, sf, off, up, down) => {
        expect(cal.fix(num, sf).off()).toBe(off);
        expect(cal.fix(num, sf).up()).toBe(up);
        expect(cal.fix(num, sf).down()).toBe(down);
    });
});





describe('e mantissa', () => {
    const cases = [
        [1, 0, 1],
        [1.001, 0, 1.001],
        [0.999, -1, 9.99],
        [10, 1, 1],
        [10.01, 1, 1.001],
        [9.999, 0, 9.999],
        [0.1, -1, 1],
        [0.10001, -1, 1.0001],
        [0.09999, -2, 9.999],
        [-1.001, 0, -1.001],
        [-0.999, -1, -9.99],
        [1.234, 0, 1.234],
        [1234, 3, 1.234],
        [0.1234, -1, 1.234],
        [0, 0, 0],
        [-0.1234, -1, -1.234],
    ]
    it.each(cases)('e mantissa(%p)', (num, e, m) => {
        expect(cal.e(num)).toBe(e);
        expect(cal.mantissa(num)).toBe(m);
    });
});



describe('logCeil logFloor', () => {
    const cases = [
        [5, 10, 1],
        [23, 100, 10],
        [0.456, 1, 0.1],
        [0.00235, 0.01, 0.001],
    ]
    it.each(cases)('logCeil logFloor(%p)', (num, ceil, floor) => {
        expect(cal.logCeil(num)).toBe(ceil);
        expect(cal.logFloor(num)).toBe(floor);
    });
});




describe('toFraction', () => {
    const cases = [
        [0.5, 1, 2],
        [-456 / 123, -152, 41],
        [0, 0, 1],
        [1 / 0, 1, 0],
        [-1 / 0, -1, 0],
    ]
    it.each(cases)('toFraction(%p)', (num, p, q) => {
        expect(cal.toFraction(num)).toStrictEqual([p, q]);
    });


    it('pass within 100000', () => {
        function jump(i: number, ratio: number): number {
            if (i <= 100) return 1
            return Math.ceil(i / ratio)
        }
        for (let i = 0; i <= 100000; i += jump(i, 11)) {
            for (let j = 1; j <= 100000; j += jump(j, 15)) {
                let f = i / j

                let [a, b] = cal.toFraction(f);
                expect(i * b - a * j === 0).toBeTrue();

                let v = f + Number.EPSILON * 100
                let [p, q] = cal.toFraction(v);
                expect(i * q - p * j === 0).toBeTrue();

                let u = f - Number.EPSILON * 100
                let [r, s] = cal.toFraction(u);
                expect(i * s - r * j === 0).toBeTrue();

                let w = cal.blur(f)
                let [h, k] = cal.toFraction(w);
                expect(i * k - h * j === 0).toBeTrue();

            }
        }
    })

});



describe('isRational', () => {


    it('true within 100000', () => {
        function jump(i: number, ratio: number): number {
            if (i <= 100) return 1
            return Math.ceil(i / ratio)
        }
        for (let i = 0; i <= 100000; i += jump(i, 12)) {
            for (let j = 1; j <= 100000; j += jump(j, 14)) {
                let f = i / j;
                expect(cal.isRational(f)).toBeTrue();
                expect(cal.isRational(f + Number.EPSILON * 100)).toBeTrue();
                expect(cal.isRational(f - Number.EPSILON * 100)).toBeTrue();
                expect(cal.isRational(cal.blur(f))).toBeTrue();
            }
        }
    })

    it('false if surd', () => {
        for (let i = 0; i <= 1000; i++) {
            let r = Math.sqrt(i)
            if (Number.isInteger(r)) {
                expect(cal.isRational(r)).toBeTrue();
            } else {
                expect(cal.isRational(r)).toBeFalse();
                expect(cal.isRational(r + Number.EPSILON * 100)).toBeFalse();
                expect(cal.isRational(r - Number.EPSILON * 100)).toBeFalse();
                expect(cal.isRational(cal.blur(r))).toBeFalse();
            }
        }
    })




    it('handle special cases', () => {
        expect(cal.isRational(0)).toBeTrue();
        expect(cal.isRational(1 / 0)).toBeFalse();
        expect(cal.isRational(-1 / 0)).toBeFalse();
    })

});






describe('toSurd', () => {
    const cases = [
        [Math.sqrt(0), 0, 1],
        [Math.sqrt(1), 1, 1],
        [Math.sqrt(2), 1, 2],
        [Math.sqrt(3), 1, 3],
        [Math.sqrt(4), 2, 1],
        [Math.sqrt(5), 1, 5],
        [Math.sqrt(6), 1, 6],
        [Math.sqrt(7), 1, 7],
        [Math.sqrt(8), 2, 2],
        [Math.sqrt(9), 3, 1],
        [Math.sqrt(10), 1, 10],
        [Math.sqrt(12), 2, 3],
        [Math.sqrt(16), 4, 1],
        [Math.sqrt(18), 3, 2],
        [Math.sqrt(20), 2, 5],
        [Math.sqrt(737100), 90, 91],
        [-Math.sqrt(20), -2, 5],
        [Math.sqrt((4 * Math.sqrt(3)) ** 2), 4, 3],
        [1.999999999999999, 2, 1]
    ]
    it.each(cases)('simplifySurd(%p)', (num, a, b) => {
        expect(cal.toSurd(num)).toStrictEqual([a, b]);
    });
});



describe('isPrime', () => {
    const primes =
        [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113]
    it('pass first 100 primes', () => {
        for (let i = 0; i <= 100; i++) {
            expect(cal.isPrime(i)).toBe(primes.includes(i));
        }
    });


    it('return false for non-integer', () => {
        expect(cal.isPrime(0.5)).toBeFalse();
    })

});



describe('primes', () => {
    const primes =
        [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113]
    it('pass first 100 primes', () => {
        for (let i = 0; i <= 100; i++) {
            expect(cal.primes(i)).toStrictEqual(
                primes.filter($ => $ <= i));
        }
    });
});



describe('primeFactors', () => {
    const cases: [number, number[]][] = [
        [1, []],
        [2, [2]],
        [3, [3]],
        [4, [2, 2]],
        [5, [5]],
        [6, [2, 3]],
        [7, [7]],
        [8, [2, 2, 2]],
        [9, [3, 3]],
        [10, [2, 5]],
        [12, [2, 2, 3]],
        [32659200, [2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 5, 5, 7]]
    ]
    it.each(cases)('primeFactors(%p)', (num, arr) => {
        expect(cal.primeFactors(num)).toStrictEqual(arr);
    });
});



describe('factorial', () => {
    const cases = [
        [0, 1],
        [1, 1],
        [2, 2],
        [3, 6],
        [4, 24],
        [5, 120],
        [6, 720],
    ]
    it.each(cases)('factorial(%p)', (num, expected) => {
        expect(cal.factorial(num)).toStrictEqual(expected);
    });
});



describe('nCr nPr', () => {
    const cases = [
        [8, 0, 1, 1],
        [8, 1, 8, 8],
        [8, 2, 28, 56],
        [8, 8, 1, 40320],
        [6, 2, 15, 30],
        [15, 7, 6435, 32432400],
    ]
    it.each(cases)('nCr nPr(%p,%p)', (n, r, nCr, nPr) => {
        expect(cal.nCr(n, r)).toStrictEqual(nCr);
        expect(cal.nPr(n, r)).toStrictEqual(nPr);
    });
});







describe('range', () => {
    const cases: [number, number, number[]][] = [
        [2, 5, [2, 3, 4, 5]],
        [1.1, 9.3, [2, 3, 4, 5, 6, 7, 8, 9]],
        [-2, 3, [-2, -1, 0, 1, 2, 3]],
        [-2.3, 2.3, [-2, -1, 0, 1, 2]],
    ]
    it.each(cases)('range(%p,%p)', (min, max, expected) => {
        expect(cal.range(min, max)).toStrictEqual(expected);
    });
});






describe('trace', () => {

    it('return the points', () => {
        expect(cal.trace(x => x ** 2, [0, 4], 5))
            .toStrictEqual([[0, 0], [1, 1], [2, 4], [3, 9], [4, 16]]);
        expect(cal.trace(t => [t, t ** 2], [0, 4], 5))
            .toStrictEqual([[0, 0], [1, 1], [2, 4], [3, 9], [4, 16]]);
    })


    it('handles NaN', () => {
        expect(cal.trace(x => Math.sqrt(x), [-2, 2], 5))
            .toStrictEqual([
                [-2, NaN], [-1, NaN], [0, 0], [1, 1], [2, Math.sqrt(2)]
            ]);

        expect(cal.trace(t => [t, Math.sqrt(t)], [-2, 2], 5))
            .toStrictEqual([
                [-2, NaN], [-1, NaN], [0, 0], [1, 1], [2, Math.sqrt(2)]
            ]);

    })


});



describe('traceCircle', () => {

    test('return points on circle', () => {
        let arr = cal.traceCircle([1, 2], 3, [0, 360]);

        expect(arr).toBeDeepCloseTo([
            [4, 2],
            [3.9939600294156534, 2.1902717589696934],
            [3.975864438492386, 2.379777360721248],
            [3.9457860917881202, 2.5677537330812306],
            [3.9038461041890686, 2.753443961543238],
            [3.8502133532228364, 2.9361003370954615],
            [3.7851037990482177, 3.1149873669809827],
            [3.7087796148598637, 3.2893847362675146],
            [3.621548131209355, 3.4585902083014055],
            [3.523760598493544, 3.6219224523667926],
            [3.4158107725931757, 3.778723787163921],
            [3.2981333293569346, 3.9283628290596178],
            [3.1712021143152107, 4.070237034446335],
            [3.035528234671397, 4.2037751259726],
            [2.891658001253568, 4.32843939287527],
            [2.7401707287135952, 4.443727856151007],
            [2.5816764028315085, 4.549176289848543],
            [2.4168132243180493, 4.6443600903427456],
            [2.2462450390056605, 4.728895986063555],
            [2.0706586647756167, 4.80244358079532],
            [1.890761125984826, 4.864706724332221],
            [1.7072768065282826, 4.915434704970625],
            [1.520944533000792, 4.9544232590366235],
            [1.332514599703034, 4.981515393383763],
            [1.1427457474712273, 4.996602017549024],
            [0.9524021084955759, 4.9996223830216255],
            [0.7622501294296344, 4.990564327855827],
            [0.5730554851801444, 4.969464325642798],
            [0.38557999580442714, 4.936407338644336],
            [0.2005785589298943, 4.891526475679826],
            [0.018796110047734294, 4.8350024561440055],
            [-0.15903537707938709, 4.767062882313744],
            [-0.33219983781732365, 4.687981322874007],
            [-0.5, 4.598076211353314],
            [-0.6617601915983318, 4.497709563904313],
            [-0.8168290614130016, 4.387285521592496],
            [-0.9645822018358561, 4.2672487230627745],
            [-1.104424663118964, 4.138082514136588],
            [-1.2357933490272641, 4.000307001548875],
            [-1.3581592842283619, 3.8544769586618166],
            [-1.4710297442894973, 3.7011795915883137],
            [-1.5739502397049305, 3.54103217472022],
            [-1.6665063459647698, 3.374679565182233],
            [-1.7483253722962075, 3.2027916062198436],
            [-1.819077862357724, 3.026060429977009],
            [-1.878478920843491, 2.8451976705242927],
            [-1.9262893606562201, 2.6609315983596264],
            [-1.9623166660291824, 2.4740041879200536],
            [-1.986415767719253, 2.285168129912554],
            [-1.9984896271495551, 2.0951838004942096],
            [-1.9984896271495556, 1.904816199505803],
            [-1.9864157677192544, 1.7148318700874587],
            [-1.9623166660291842, 1.5259958120799577],
            [-1.9262893606562228, 1.339068401640386],
            [-1.8784789208434947, 1.1548023294757195],
            [-1.819077862357728, 0.9739395700230016],
            [-1.7483253722962124, 0.7972083937801671],
            [-1.6665063459647746, 0.6253204348177774],
            [-1.5739502397049367, 0.45896782527978974],
            [-1.4710297442895053, 0.2988204084116981],
            [-1.3581592842283703, 0.14552304133819494],
            [-1.2357933490272734, -0.0003070015488644273],
            [-1.104424663118972, -0.13808251413658024],
            [-0.9645822018358645, -0.2672487230627665],
            [-0.8168290614130105, -0.3872855215924882],
            [-0.6617601915983424, -0.4977095639043063],
            [-0.5, -0.5980762113533085],
            [-0.3321998378173361, -0.687981322874001],
            [-0.15903537707940085, -0.7670628823137382],
            [0.018796110047719194, -0.8350024561440001],
            [0.20057855892987808, -0.8915264756798216],
            [0.38557999580441016, -0.9364073386443326],
            [0.5730554851801258, -0.9694643256427953],
            [0.7622501294296151, -0.9905643278558256],
            [0.9524021084955558, -0.9996223830216246],
            [1.1427457474712086, -0.9966020175490247],
            [1.3325145997030141, -0.9815153933837646],
            [1.520944533000769, -0.954423259036628],
            [1.707276806528259, -0.9154347049706306],
            [1.8907611259848018, -0.8647067243322288],
            [2.0706586647755927, -0.802443580795329],
            [2.2462450390056388, -0.7288959860635646],
            [2.4168132243180276, -0.6443600903427571],
            [2.5816764028314867, -0.5491762898485559],
            [2.7401707287135744, -0.4437278561510216],
            [2.891658001253548, -0.32843939287528645],
            [3.0355282346713772, -0.2037751259726175],
            [3.171202114315192, -0.07023703444635565],
            [3.2981333293569164, 0.07163717094036093],
            [3.415810772593159, 0.22127621283605592],
            [3.523760598493528, 0.378077547633183],
            [3.6215481312093405, 0.5414097916985678],
            [3.7087796148598504, 0.7106152637324579],
            [3.7851037990482066, 0.8850126330189885],
            [3.850213353222827, 1.063899662904511],
            [3.9038461041890615, 1.2465560384567336],
            [3.9457860917881145, 1.4322462669187392],
            [3.975864438492382, 1.6202226392787211],
            [3.9939600294156508, 1.809728241030272],
            [4, 1.9999999999999647]
        ]);
    });


})




describe('crammer', () => {

    it('solve equations', () => {
        expect(cal.crammer(1, 1, 5, 1, -1, 1)).toEqual([3, 2]);
        expect(cal.crammer(2, 3, 23, 4, -5, -9)).toEqual([4, 5]);
        expect(cal.crammer(1, 1, 2, 2, 2, 4)).toEqual([NaN, NaN]);
        expect(cal.crammer(1, 1, 2, 2, 2, 5)).toEqual([NaN, NaN]);
    });


});