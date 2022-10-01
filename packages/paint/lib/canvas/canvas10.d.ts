import { px, Point } from '../global';
import { Canvas09 } from './canvas09';
/**
 * Handle:
 * - label
 */
export declare class Canvas10 extends Canvas09 {
    labelPoint(text: string | number, point: Point, dir: number, radius: px): void;
    labelPointAuto(text: string | number, point: Point, radius: px): void;
    labelAngle(text: string | number, [A, O, B]: [Point, Point, Point], dir: number, radius: px): void;
    labelLine(text: string | number, [A, B]: [Point, Point], dir: number, radius: px): void;
    labelFront(text: string | number, [A, B]: [Point, Point], dir: number, radius: px): void;
}
//# sourceMappingURL=canvas10.d.ts.map