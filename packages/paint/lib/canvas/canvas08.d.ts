import { Canvas07 } from './canvas07.js';
/**
 * Handle:
 * - Axis
 */
export declare class Canvas08 extends Canvas07 {
    private bottomEnd;
    private leftEnd;
    xAxis(): void;
    yAxis(): void;
    xAxisLabel(text: string): void;
    yAxisLabel(text: string): void;
    private xTicks;
    private yTicks;
    xAxisTick(interval: number): void;
    yAxisTick(interval: number): void;
    xAxisTickMark(interval: number): void;
    yAxisTickMark(interval: number): void;
    private gridLineVert;
    private gridLineHori;
    xAxisGrid(interval: number): void;
    yAxisGrid(interval: number): void;
}
//# sourceMappingURL=canvas08.d.ts.map