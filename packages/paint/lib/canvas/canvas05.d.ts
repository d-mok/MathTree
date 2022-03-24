import { px, Point } from '../global';
import { Canvas04 } from './canvas04';
/**
 * Handle:
 * - text basic
 */
export declare class Canvas05 extends Canvas04 {
    private plainPx;
    private latexPx;
    private textPx;
    private text;
    write(text: string, point: Point): void;
    private labelOffset;
    label(text: string | number, point: Point, radius: px, dir: number): void;
    private plainSemi;
    private latexSemi;
    private textSemi;
}
//# sourceMappingURL=canvas05.d.ts.map