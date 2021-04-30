import * as DiceObj from './Dice/index'
globalThis.dice = DiceObj



import * as OwlObj from './Owl/index'
globalThis.owl = OwlObj

import * as ContractObj from './Contract/index'
globalThis.contract = ContractObj.contract


import './Blood/index'

declare global {
    var dice: typeof DiceObj
    var owl: typeof OwlObj
    var contract: typeof ContractObj.contract
}
