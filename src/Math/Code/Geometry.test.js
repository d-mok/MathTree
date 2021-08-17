

test('Slope', () => {
    expect(Slope([0, 0], [1, 2])).toBe(2);
    expect(Slope([1, 2], [0, 0])).toBe(2);
    expect(Slope([3, 4], [6, -5])).toBe(-3);
    expect(() => Slope([3, 4], [3, 3])).toThrow();
    expect(() => Slope([3, 3], [3, 3])).toThrow();
});




test('SlopePd', () => {
    expect(SlopePd([0, 0], [1, 2])).toBe(-1 / 2);
    expect(SlopePd([1, 2], [0, 0])).toBe(-1 / 2);
    expect(SlopePd([3, 4], [6, -5])).toBe(1 / 3);
    expect(() => SlopePd([3, 4], [2, 4])).toThrow();
    expect(() => SlopePd([3, 3], [3, 3])).toThrow();
});



test('Distance', () => {
    expect(Distance([0, 0], [1, 2])).toBeCloseTo(5 ** 0.5, 12);
    expect(Distance([1, 2], [0, 0])).toBeCloseTo(5 ** 0.5, 12);
    expect(Distance([3, 4], [6, -5])).toBeCloseTo(90 ** 0.5, 12);
    expect(Distance([10, 5], [10, 5])).toBe(0);
    expect(Distance([10, 5], [-10, 5])).toBe(20);
});




test('ChessboardDistance', () => {
    expect(ChessboardDistance([0, 0], [1, 2])).toBe(2);
    expect(ChessboardDistance([0, 0], [3, 2])).toBe(3);
});




test('Mid', () => {
    expect(Mid([0, 0], [1, 2])).toEqual([0.5, 1]);
    expect(Mid([1, 2], [0, 0])).toEqual([0.5, 1]);
    expect(Mid([1, 2], [1, 2])).toEqual([1, 2]);
    expect(Mid([3, 4], [6, -5])).toEqual([4.5, -0.5]);
    expect(Mid([1, 2], [3, 4], [5, 6])).toEqual([3, 4]);
    expect(Mid([0, 0], [2, 0], [2, 2], [0, 2])).toEqual([1, 1]);
});



test('Slide', () => {
    expect(Slide([0, 0], [4, 8], 0.25)).toEqual([1, 2]);
    expect(Slide([0, 0], [4, 8], 1.25)).toEqual([5, 10]);
    expect(Slide([0, 0], [4, 8], -0.25)).toEqual([-1, -2]);
});





test('Rotate', () => {
    expect(Rotate([1, 2], [0, 0], 90)).toEqual([-2, 1]);
    expect(Rotate([1, 2], [0, 0], 180)).toEqual([-1, -2]);
    expect(Rotate([1, 2], [0, 0], 270)).toEqual([2, -1]);
    expect(Rotate([1, 2], [0, 0], 360)).toEqual([1, 2]);
});


test('Dir', () => {
    expect(Dir([1, 0], [3, 2])).toBe(45);
    expect(Dir([3, 2], [1, 0])).toBe(225);
    expect(() => Dir([3, 2], [3, 2])).toThrow();
});




test('PdFoot', () => {
    expect(PdFoot([-1, -1], [1, 1], [-2, 2])).toBeArrayCloseTo([0, 0]);
    expect(PdFoot([-1, -1], [1, 1], [0, 0])).toBeArrayCloseTo([0, 0]);
});


test('Intersection', () => {
    expect(Intersection([0, 0], [2, 2], [2, 0], [0, 2])).toEqual([1, 1]);
    expect(Intersection([2, 1], [-1, 1], [1, -1], [1, 2])).toEqual([1, 1]);
    expect(() => Intersection([0, 0], [2, 2], [0, 0], [2, 2])).toThrow();
});



test('Move', () => {
    expect(Move([1, 2], 90, 3)).toEqual([1, 5]);
    expect(Move([1, 2], 90, -3)).toEqual([1, -1]);
    expect(Move([1, 2], -90, 3)).toEqual([1, -1]);
    expect(Move([1, 2], 180, 3)).toEqual([-2, 2]);
    expect(Move([1, 2], 0, 3)).toEqual([4, 2]);
    expect(Move([1, 2], 30, 3)).toBeArrayCloseTo([3.598076211, 3.5]);
    expect(Move([1, 2], [10, 12], 3)).toBeArrayCloseTo([3.006894195, 4.229882439]);
    expect(Move([1, 2], [[0, 0], [1, 0]], 3)).toBeArrayCloseTo([4, 2]);
});



test('MoveX', () => {
    expect(MoveX([1, 2], 3)).toEqual([4, 2]);
    expect(MoveX([1, 2], 4)).toEqual([5, 2]);
    expect(MoveX([1, 2], -3)).toEqual([-2, 2]);
});



test('MoveY', () => {
    expect(MoveY([1, 2], 3)).toEqual([1, 5]);
    expect(MoveY([1, 2], 4)).toEqual([1, 6]);
    expect(MoveY([1, 2], -3)).toEqual([1, -1]);
});




test('Shift', () => {
    expect(Shift([0, 1], [[0, 0], [1, 0]], 1)).toEqual([1, 1]);
    expect(Shift([0, 1], [[0, 0], [1, 0]], 2)).toEqual([2, 1]);
    expect(Shift([3, 4], [[1, 2], [5, 0]], 3)).toEqual([15, -2]);
});






test('ReflectX', () => {
    expect(ReflectX([1, 2])).toEqual([1, -2]);
    expect(ReflectX([-1, 2])).toEqual([-1, -2]);
    expect(ReflectX([1, -2])).toEqual([1, 2]);
});




test('ReflectY', () => {
    expect(ReflectY([1, 2])).toEqual([-1, 2]);
    expect(ReflectY([-1, 2])).toEqual([1, 2]);
    expect(ReflectY([1, -2])).toEqual([-1, -2]);
});






test('IntersectAngle', () => {
    expect(IntersectAngle(0, 1)).toBe(45);
    expect(IntersectAngle(1, -1)).toBe(90);
    expect(IntersectAngle(1, -2)).toBeCloseTo(71.56505118);
    expect(IntersectAngle(-2, 1)).toBeCloseTo(71.56505118);
    expect(IntersectAngle(2, 3)).toBeCloseTo(8.130102354);
    expect(IntersectAngle(3, 2)).toBeCloseTo(8.130102354);
    // expect(IntersectAngle(1, 1 / 0)).toBe(45);
});



test('Angle', () => {
    expect(Angle([1, 0], [0, 0], [0, 2])).toBe(90);
    expect(Angle([2, 2], [1, 1], [1, 3])).toBe(45);
    expect(Angle([1, 3], [1, 1], [2, 2])).toBe(45);
    expect(Angle([1, 3], [1, 1], [1, 3])).toBe(0);
    expect(Angle([1, 0], [0, 0], [-1, 0])).toBe(180);
});



test('AnglePolar', () => {
    expect(AnglePolar([1, 0], [0, 0], [0, 2])).toBe(90);
    expect(AnglePolar([2, 2], [1, 1], [1, 3])).toBe(45);
    expect(AnglePolar([1, 3], [1, 1], [2, 2])).toBe(315);
    expect(AnglePolar([1, 3], [1, 1], [1, 3])).toBe(0);
    expect(AnglePolar([1, 0], [0, 0], [-1, 0])).toBe(180);
});



test('IsReflex', () => {
    expect(IsReflex([1, 0], [0, 0], [0, 2])).toBe(false);
    expect(IsReflex([2, 2], [1, 1], [1, 3])).toBe(false);
    expect(IsReflex([1, 3], [1, 1], [2, 2])).toBe(true);
    expect(IsReflex([1, 3], [1, 1], [1, 3])).toBe(false);
    expect(IsReflex([1, 0], [0, 0], [-1, 0])).toBe(false);
});



// test('Turtle', () => {
//     expect(Turtle([0, 0], [0, 1], [90, 1], [90, 1])).toEqual([[0, 0], [1, 0], [1, 1], [0, 1]]);
// });




test('RegularPolygon', () => {
    expect(RegularPolygon(4, [0, 0], 1, 0)).toEqual([[1, 0], [0, 1], [-1, 0], [0, -1]]);
});





test('ArcLength', () => {
    expect(ArcLength(2, 90)).toBe(Math.PI);
    expect(ArcLength(2, 180)).toBe(2 * Math.PI);
    expect(ArcLength(0, 180)).toBe(0);
});



test('IsConvexPolygon', () => {
    expect(IsConvexPolygon([0, 0], [1, 0], [0, 1])).toBe(true);
    expect(IsConvexPolygon([0, 0], [3, 0], [1, 1], [0, 3])).toBe(false);
});




test('ArrangePoints', () => {
    expect(ArrangePoints([0, 0], [1, 1], [0, 1], [1, 0]))
        .toEqual([[1, 1], [0, 1], [0, 0], [1, 0]]);
    expect(ArrangePoints([0, 0], [1, 2], [2, 1], [0, 1], [1, 0]))
        .toEqual([[2, 1], [1, 2], [0, 1], [0, 0], [1, 0]]);
});