test('toBeArrayCloseTo', () => {
  expect([1, 1 / 3]).toBeArrayCloseTo([1, 0.333333333]);
  expect([1, 1 / 3]).not.toBeArrayCloseTo([1, 0.3333333]);
  expect([1, 0.1 + 0.2]).toBeArrayCloseTo([1, 0.3]);
  expect([1, 0.1 + 0.2]).not.toBeArrayCloseTo([1, 0.30000001]);
});





test('toBeFlatWithin', () => {
  expect([100, [105]]).toBeFlatWithin(90, 110);
  expect([100, [150]]).not.toBeFlatWithin(0, 100);
});


test('toBeFlatAbsWithin', () => {
  expect([-100, [-105]]).toBeFlatAbsWithin(90, 110);
  expect([-100, [-150]]).not.toBeFlatAbsWithin(0, 100);
});



test('toBeFlatIs', () => {
  expect([1, [3]]).toBeFlatIs(IsOdd);
  expect([1, [2]]).not.toBeFlatIs(IsOdd);
});



test('toBeFlatDistinct', () => {
  expect([1, [3], 3, 1]).toBeFlatDistinct(2);
  expect([1, [2], 2, 2, 1]).not.toBeFlatDistinct(3);
});





test('toBeFlatDiverse', () => {
  expect([ListIntegers(1, 200)]).toBeFlatDiverse();
  expect([1, [2], 2, 2, 1]).not.toBeFlatDiverse();
});




test('toAllHaveLength', () => {
  expect([[1, 1, 1], [2, 2, 3], [3, 3, 3], [4, 5, 6]]).toAllHaveLength(3);
  expect([[1, 1, 1], [2, 2, 3], [3, 3, 3], [4, 5]]).not.toAllHaveLength(3);
});





test('toBeIncluded', () => {
  expect([[1, 1, 1], [2, 2, 3], [3, 3, 3], [4, 5, 6]]).toBeIncluded([1, 2, 3, 4, 5, 6]);
  expect([[7, 1, 1], [2, 2, 3], [3, 3, 3], [4, 5]]).not.toBeIncluded([1, 2, 3, 4, 5, 6]);
});



test('toBeUnique', () => {
  expect([[1, 0, -1], [4, 2, 3], [4, 2, 3], [4, 5, 6]]).toBeUnique();
  expect([[7, 1, 1], [2, 4, 3], [4, 5]]).not.toBeUnique();
});

