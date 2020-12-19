
test('LinearProgram', () => {
    let LP = LinearProgram([
        [1, 0, '<', 10],
        [1, 0, '>', -5],
        [0, 1, '<', 10],
        [0, 1, '>', -5],
    ],
        [4, 5, 6]);


    expect(LP.vertex.length).toBe(4);
    expect(LP.integral.length).toBe(14 * 14);
    expect(LP.vertexMin.point).toEqual([-5, -5]);
    expect(LP.vertexMin.value).toBe(-39);

    LP = LinearProgram([
        [1, 1, '<', 2],
        [1, 1, '>', 0],
        [0, 1, '>', 0],
        [0, 1, '<', 2],
    ],
        [1, -1, 0]);


    expect(LP.vertex).toHaveLength(4);
    expect(LP.integral).toHaveLength(1);
    expect(LP.vertexMax).toEqual({
        point: [2, 0],
        value: 2
    });
    expect(LP.vertexMin).toEqual({
        point: [-2, 2],
        value: -4
    });
    expect(LP.integralMax).toEqual({
        point: [0, 1],
        value: -1
    });

    expect(LP.integralMin).toEqual({
        point: [0, 1],
        value: -1
    });



    LP = LinearProgram([
        [1, 0, '<', 1],
        [1, 0, '>', 0],
        [0, 1, '<', 1],
        [0, 1, '>', 0],
    ],
        [1, 1, 0]);


    expect(LP.vertex.length).toBe(4);
    expect(LP.integral.length).toBe(0);
    expect(LP.vertexMax).toEqual({
        point: [1, 1],
        value: 2
    });
    expect(LP.vertexMin).toEqual({
        point: [0, 0],
        value: 0
    });




});
