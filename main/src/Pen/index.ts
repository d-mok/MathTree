import { PenCls } from './Pen'
import { AutoPenCls } from './AutoPen'
import { PhyPenCls } from './PhyPen'

declare global {
    var Pen: typeof PenCls
    var AutoPen: typeof AutoPenCls
    var PhyPen: typeof PhyPenCls
}

/**
 * @ignore
 */
globalThis.Pen = PenCls

/**
 * @ignore
 */
globalThis.AutoPen = AutoPenCls

/**
 * @ignore
 */
globalThis.PhyPen = PhyPenCls
