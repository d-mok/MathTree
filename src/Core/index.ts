import * as DiceObj from './Dice/index'

declare global {
    var Dice: typeof DiceObj
}
globalThis.Dice = DiceObj