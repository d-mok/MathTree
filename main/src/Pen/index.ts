import { PenCls } from './Pen.js'
import { AutoPenCls } from './AutoPen.js'
import { PhyPenCls } from './PhyPen.js'

declare global {
    var Pen: typeof PenCls
    var AutoPen: typeof AutoPenCls
    var PhyPen: typeof PhyPenCls
}

globalThis.Pen = PenCls

globalThis.AutoPen = AutoPenCls

globalThis.PhyPen = PhyPenCls
