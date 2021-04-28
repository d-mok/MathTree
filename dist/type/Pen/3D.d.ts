/**
* @category 3DPen
* @return projector function from 3D point to 2D plane
* ```typescript
* const pj = Projector(60,0.5) // create a 3D projector function
* pj(1,1,0) // [1.25, 0.433012701892]
* ```
*/
declare function Projector(angle?: number, depth?: number): (x: number, y: number, z: number) => Point;
