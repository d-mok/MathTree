

test('Vec3D', () => {
    expect(Vec3D([1, 2, 3], [10, 5, 2])).toEqual([9, 3, -1]);
});




test('Vec3DAdd', () => {
    expect(Vec3DAdd([1, 2, 3], [3, 4, 5], [5, 6, 7])).toEqual([9, 12, 15]);
});



test('Vec3DMean', () => {
    expect(Vec3DMean([1, 2, 3], [3, 4, 5], [5, 6, 7])).toEqual([3, 4, 5]);
});




test('Vec3DLength', () => {
    expect(Vec3DLength([-3, 4, 0])).toEqual(5);
    expect(Vec3DLength([0, 0, 4])).toEqual(4);
    expect(Vec3DLength([1, 2, 3])).toEqual(Math.sqrt(14));

});




test('Vec3DScale', () => {
    expect(Vec3DScale([1, 2, 3], 2)).toEqual([2, 4, 6]);
    expect(Vec3DScale([1, 2, 3], -2)).toEqual([-2, -4, -6]);
});




test('Vec3DUnit', () => {
    expect(Vec3DUnit([2, 0, 0])).toEqual([1, 0, 0]);
    expect(Vec3DUnit([0, -2, 0])).toEqual([0, -1, 0]);
    let [x, y, z] = Vec3DUnit([1, 2, 3]);
    expect(x).toBeCloseTo(1 / Math.sqrt(14));
    expect(y).toBeCloseTo(2 / Math.sqrt(14));
    expect(z).toBeCloseTo(3 / Math.sqrt(14));
});


test('Vec3DScaleTo', () => {
    expect(Vec3DScaleTo([2, 0, 0], 10)).toEqual([10, 0, 0]);
    expect(Vec3DScaleTo([0, -2, 0], 100)).toEqual([0, -100, 0]);
    expect(Vec3DScaleTo([1, 2, 2], 6)).toEqual([2, 4, 4]);
});




test('Vec3DProj', () => {
    expect(Vec3DProj([2, 1, 3], [1, 0, 0])).toEqual([2, 0, 0]);
});






test('DotProduct', () => {
    expect(DotProduct([1, 1, 0], [0, 1, 1])).toEqual(1);
    expect(DotProduct([1, 2, 3], [4, 5, -6])).toEqual(-4);
});






test('CrossProduct', () => {
    expect(CrossProduct([1, 1, 0], [0, 1, 1])).toEqual([1, -1, 1]);
});








test('NormalVector', () => {
    let [x, y, z] = NormalVector([0, 0, 0], [1, 1, 0], [0, 1, 1]);
    expect(x).toBeCloseTo(1 / Math.sqrt(3));
    expect(y).toBeCloseTo(-1 / Math.sqrt(3));
    expect(z).toBeCloseTo(1 / Math.sqrt(3));
});





test('ProjectionOnPlane', () => {
    let P = [2, 3, 4];
    let [A, B, C] = [[0, 0, 0], [1, 0, 0], [0, 1, 0]];
    expect(ProjectionOnPlane(P, [A, B, C])).toEqual([2, 3, 0]);
});




test('EmbedPlane', () => {
    let [A, B, C] = [[0, 0], [1, 0], [0, 1]];
    expect(EmbedPlane([A, B, C], [0, 0, 2], [1, 0, 0], [0, 1, 0])).toEqual([[0, 0, 2], [1, 0, 2], [0, 1, 2]]);
});




test('EmbedPlaneZ', () => {
    let [A, B, C] = [[0, 0], [1, 0], [0, 1]];
    expect(EmbedPlaneZ([A, B, C], 2)).toEqual([[0, 0, 2], [1, 0, 2], [0, 1, 2]]);
});




test('ExtrudeBase', () => {
    let [A, B, C] = [[0, 0, 0], [4, 0, 0], [0, 4, 0]];
    expect(ExtrudeBase([A, B, C], [[0, 0, 4]], 0.25)).toEqual([[0, 0, 1], [3, 0, 1], [0, 3, 1]]);
});




test('Extrude', () => {
    let [A, B, C] = [[0, 0, 0], [4, 0, 0], [0, 4, 0]];
    expect(Extrude([A, B, C], [[0, 0, 4]], 0.25)).toEqual([[0, 0, 1], [3, 0, 1], [0, 3, 1]]);
});


