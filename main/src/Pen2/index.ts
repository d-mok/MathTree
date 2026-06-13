import { PenCls } from './Pen.js'

declare global {
    var Pen2: typeof PenCls
}

globalThis.Pen2 = PenCls
