import { Chance } from 'chance'


declare global {
    namespace Chance {
        interface Chance {
            prime: (opt: { min: number, max: number }) => number // patch
        }
    }
    var chance: Chance.Chance
}

var chance = new Chance()
globalThis.chance = chance

