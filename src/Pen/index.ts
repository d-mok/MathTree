import { PenCls } from './Pen'
import { AutoPenCls } from './AutoPen'


declare global {
    var Pen: typeof PenCls
    var AutoPen: typeof AutoPenCls
}

/**
 * @ignore
 */
globalThis.Pen = PenCls

/**
 * @ignore
 */
globalThis.AutoPen = AutoPenCls