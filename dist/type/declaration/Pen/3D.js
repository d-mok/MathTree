"use strict";
/**
* @category 3DPen
* @return projector function from 3D point to 2D plane
* ```typescript
* const pj = Projector(60,0.5) // create a 3D projector function
* pj(1,1,0) // [1.25, 0.433012701892]
* ```
*/
function Projector(angle = 60, depth = 0.5) {
    return function (x, y, z) {
        let x_new = x + depth * y * cos(angle);
        let y_new = z + depth * y * sin(angle);
        return [x_new, y_new];
    };
}
globalThis.Projector = Projector;