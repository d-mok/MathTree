



test('isConstrained', () => {
    // test rectangular
    expect(isConstrained([
        [1, 0, '<', 10],
        [1, 0, '>', -5],
        [0, 1, '<', 10],
        [0, 1, '>', -5],
    ], [0, 0])).toBe(true);
});




// test('LinearProgram', () => {
//     // test rectangular
//     let LP = LinearProgram([
//         [1, 0, '<', 10],
//         [1, 0, '>', -5],
//         [0, 1, '<', 10],
//         [0, 1, '>', -5],
//     ],
//         [4, 5, 6]);

//     expect(LP.vertex).toHaveLength(4);
//     expect(LP.integral).toHaveLength(14 * 14);
//     expect(LP.vertexMax).toEqual({
//         point: [10, 10],
//         value: 96
//     });
//     expect(LP.vertexMin).toEqual({
//         point: [-5, -5],
//         value: -39
//     });
//     expect(LP.integralMax).toEqual({
//         point: [9, 9],
//         value: 87
//     });

//     expect(LP.integralMin).toEqual({
//         point: [-4, -4],
//         value: -30
//     });




//     // test normal
//     LP = LinearProgram([
//         [1, 1, '<', 2],
//         [1, 1, '>', 0],
//         [0, 1, '>', 0],
//         [0, 1, '<', 2],
//     ],
//         [1, -1, 0]);


//     expect(LP.vertex).toHaveLength(4);
//     expect(LP.integral).toHaveLength(1);
//     expect(LP.vertexMax).toEqual({
//         point: [2, 0],
//         value: 2
//     });
//     expect(LP.vertexMin).toEqual({
//         point: [-2, 2],
//         value: -4
//     });
//     expect(LP.integralMax).toEqual({
//         point: [0, 1],
//         value: -1
//     });

//     expect(LP.integralMin).toEqual({
//         point: [0, 1],
//         value: -1
//     });


//     // test no integral
//     LP = LinearProgram([
//         [1, 0, '<', 1],
//         [1, 0, '>', 0],
//         [0, 1, '<', 1],
//         [0, 1, '>', 0],
//     ],
//         [1, 1, 0]);


//     expect(LP.vertex).toHaveLength(4);
//     expect(LP.integral).toHaveLength(0);
//     expect(LP.vertexMax).toEqual({
//         point: [1, 1],
//         value: 2
//     });
//     expect(LP.vertexMin).toEqual({
//         point: [0, 0],
//         value: 0
//     });
//     expect(LP.integralMax).toBeUndefined();
//     expect(LP.integralMin).toBeUndefined();


//     // test one constraint
//     LP = LinearProgram([
//         [1, 1, '>', 10]
//     ],
//         [2, 1, 0]);
//     expect(LP.vertex).toHaveLength(3);
//     expect(LP.integral.length).toBeGreaterThan(100);
//     expect(LP.vertexMax).toBeUndefined();
//     expect(LP.vertexMin).toBeUndefined();
//     expect(LP.integralMax).toBeUndefined();
//     expect(LP.integralMin).toBeUndefined();

//     // test no solution
//     LP = LinearProgram([
//         [1, 1, '>', 10],
//         [1, 1, '<', 0]
//     ],
//         [2, 1, 0]);
//     expect(LP).toBeUndefined();
// });
