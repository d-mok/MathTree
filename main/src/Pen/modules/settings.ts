import { PenCls } from '../Pen'
import { Convas } from 'paint'


export class PenSettings {

    constructor(
        private pen: PenCls,
        private cv: Convas
    ) { }


    /**
     * Set the weight of the pen (line width).
     * ```
     * pen.set.weight(2) // set a bold line
     * ```
     */
    weight(weight = 1): void {
        this.cv.$WEIGHT = weight
    }
    /**
     * Set the color of both filling and stroke.
     * ```
     * pen.set.color('grey')
     * ```
     */
    color(color = "black"): void {
        this.cv.$COLOR = color
    }
    /**
     * Set the transparency. From 0 to 1.
     * ```
     * pen.set.alpha(0.9) // slightly transparent
     * ```
     */
    alpha(value = 1): void {
        this.cv.$ALPHA = value
    }
    /**
     * Set the dash pattern of line.
     * ```
     * pen.set.dash([5,5]) // set dash line
     * pen.set.dash(5) // same
     * pen.set.dash(true) // same
     * pen.set.dash(false) // set solid line
     * ```
     */
    dash(segments: (number[] | number | boolean) = []): void {
        this.cv.$DASH = segments
    }

    /**
     * Set the horizontal alignment of text.
     * ```
     * pen.set.textAlign('left') // {'left','right','center'}
     * ```
     */
    textAlign(align: CanvasTextAlign = "center"): void {
        this.cv.$TEXT_ALIGN = align
    }

    /**
     * Set the vertical alignment of text.
     * ```
     * pen.set.textBaseline('bottom') // {'top','bottom','middle'}
     * ```
     */
    textBaseline(baseline: CanvasTextBaseline = "middle"): void {
        this.cv.$TEXT_BASELINE = baseline
    }
    /**
     * Set the size of text.
     * ```
     * pen.set.textSize(2) // double-sized text
     * ```
     */
    textSize(size = 1): void {
        this.cv.$TEXT_SIZE = size
    }

    /**
     * Set italic style of text.
     * ```
     * pen.set.textItalic(true)
     * ```
     */
    textItalic(italic = false): void {
        this.cv.$TEXT_ITALIC = italic
    }

    /**
     * Set text direction.
     * ```
     * pen.set.textDir(90) // vertical text
     * ```
     */
    textDir(angle = 0): void {
        this.cv.$TEXT_DIR = angle
    }

    /**
     * Set text latex mode.
     * ```
     * pen.set.textLatex(true)
     * ```
     */
    textLatex(on = false): void {
        this.cv.$TEXT_LATEX = on
    }

    /**
     * Set the center for label dodge.
     * ```
     * pen.set.labelCenter(A,B,C,D) // centroid of A,B,C,D
     * pen.set.labelCenter() // center of canvas
     * ```
     */
    labelCenter(...centers: Point[]): void {
        this.cv.$LABEL_CENTER = centers
    }

    /**
     * Set length unit for line label.
     * ```
     * pen.set.lengthUnit('cm')
     * ```
     */
    lengthUnit(text: string = ''): void {
        this.cv.$LENGTH_UNIT = text
    }

    /**
     * Set the mode for angle.
     * All angles (e.g. AOB) will be understood as this mode.
     * ```
     * pen.set.angle('polar') // {normal' | 'polar' | 'reflex'}
     * ```
     */
    angle(mode: 'normal' | 'polar' | 'reflex' = 'normal'): void {
        this.cv.$ANGLE_MODE = mode
    }

    /**
     * Set 3D projector function.
     * ```
     * pen.set.Projector3D(60, 0.5)
     * // tilted 60 degree, 0.5 depth for y-axis
     * ```
     */
    projector3D(angle: number = 60, depth: number = 0.5): void {
        this.cv.$3D_ANGLE = angle
        this.cv.$3D_DEPTH = depth
    }

    /**
     * Set the border inch when auto creating outer border.
     * ```
     * pen.set.border(0.2) // 0.2 inch
     * ```
     */
    border(border: number = 0.2): void {
        this.cv.$BORDER = border
    }

    /**
     * Set the mode for direction of line label.
     * ```
     * pen.set.lineLabel('auto') // {'auto', 'left', 'right'}
     * ```
     */
    lineLabel(setting: 'auto' | 'left' | 'right' = 'auto'): void {
        this.cv.$LINE_LABEL = setting
    }


    /**
     * Set the mode for arrow label.
     * ```
     * pen.set.arrowLabel('line') // {'line', 'head', 'front'}
     * ```
     */
    arrowLabel(setting: 'line' | 'head' | 'front' = 'line'): void {
        this.cv.$ARROW_LABEL = setting
    }


    /**
     * Use positive x-axis only.
     * ```
     * pen.set.halfAxisX(true) // use half
     * ```
     */
    halfAxisX(half: boolean = false): void {
        this.cv.$HALF_AXIS_X = half
    }



    /**
     * Use positive y-axis only.
     * ```
     * pen.set.halfAxisY(true) // use half
     * ```
     */
    halfAxisY(half: boolean = false): void {
        this.cv.$HALF_AXIS_Y = half
    }




    /**
     * Reset all pen settings.
     */
    reset() {
        this.weight()
        this.color()
        this.alpha()
        this.dash()
        this.textAlign()
        this.textBaseline()
        this.textSize()
        this.textItalic()
        this.textDir()
        this.textLatex()
        this.labelCenter()
        this.lengthUnit()
        this.angle()
        this.lineLabel()
        this.arrowLabel()
        this.halfAxisX()
        this.halfAxisY()
    }

    /**
     * Reset all pen settings, including border and 3D.
     */
    resetAll() {
        this.reset()
        this.border()
        this.projector3D()
    }


}