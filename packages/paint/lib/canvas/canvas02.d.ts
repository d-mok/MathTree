import { dot, Point2D, Point, capturable } from '../global.js';
import { Canvas01 } from './canvas01.js';
/**
 * Handle:
 * - 3D coordinate to px conversion
 * - capturing things
 */
export declare class Canvas02 extends Canvas01 {
    protected Proj_3D_Angle: number;
    protected Proj_3D_Depth: number;
    pj(point: Point): Point2D;
    pjs(points: Point[]): Point2D[];
    protected toPx(point: Point): dot;
    capture(things: capturable[]): void;
}
//# sourceMappingURL=canvas02.d.ts.map