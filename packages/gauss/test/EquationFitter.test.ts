import { fit } from '../src/EquationFitter/index'


test('fit', () => {

    const vals = fit(
        [
            (x, y) => x - y
        ],
        {
            x: [-100, 10],
            y: [-100, 10],
        },
        {}
    )

    expect(Math.abs(vals.x - vals.y)).toBeLessThan(0.000001);
});
