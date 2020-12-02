
test('LinearProgram', () => {
    let LP = LinearProgram([
        [1,0,'<',10],
        [1,0,'>',-5],
        [0,1,'<',10],
        [0,1,'>',-5],
    ],
    [4,5,6])
    

    expect(LP.vertex.length).toBe(4);
    expect(LP.integral.length).toBe(14*14);
    expect(LP.vertexMin.point).toEqual([-5,-5]);
    expect(LP.vertexMin.value).toBe(-39);
});
