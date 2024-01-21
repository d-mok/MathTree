import { px, Point2D, Point, inch } from '../global.js';
import { Canvas02 } from './canvas02.js';
type AngleMode = 'normal' | 'polar' | 'reflex';
type LineLabel = 'auto' | 'left' | 'right';
type ArrowLabel = 'line' | 'head' | 'front';
/**
 * Handle:
 * - Settings
 */
export declare class Canvas03 extends Canvas02 {
    AUTO_BORDER: boolean;
    RANGE_DONE: boolean;
    SIZE_DONE: boolean;
    get $WEIGHT(): number;
    set $WEIGHT(value: number);
    get $COLOR(): string;
    set $COLOR(value: string);
    get $ALPHA(): number;
    set $ALPHA(value: number);
    get $DASH(): px[];
    set $DASH(value: px[] | px | boolean);
    get $TEXT_ALIGN(): CanvasTextAlign;
    set $TEXT_ALIGN(value: CanvasTextAlign);
    get $TEXT_BASELINE(): CanvasTextBaseline;
    set $TEXT_BASELINE(value: CanvasTextBaseline);
    get $TEXT_PIXEL(): px;
    set $TEXT_PIXEL(value: px);
    get $TEXT_SIZE(): number;
    set $TEXT_SIZE(value: number);
    get $TEXT_ITALIC(): boolean;
    set $TEXT_ITALIC(value: boolean);
    get $3D_ANGLE(): number;
    set $3D_ANGLE(value: number);
    get $3D_DEPTH(): number;
    set $3D_DEPTH(value: number);
    $TEXT_DIR: number;
    $TEXT_LATEX: boolean;
    $ANGLE_MODE: AngleMode;
    $LENGTH_UNIT: string;
    $BORDER: inch;
    $LINE_LABEL: LineLabel;
    $ARROW_LABEL: ArrowLabel;
    $HALF_AXIS_X: boolean;
    $HALF_AXIS_Y: boolean;
    private _$LABEL_CENTER;
    set $LABEL_CENTER(centers: Point[]);
    get $LABEL_CENTER(): [Point2D];
    private states;
    save(): void;
    restore(): void;
}
export {};
//# sourceMappingURL=canvas03.d.ts.map