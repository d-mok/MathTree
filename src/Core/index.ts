import * as DiceObj from './Dice/index'
globalThis.dice = DiceObj



import * as OwlObj from './Owl/index'
globalThis.owl = OwlObj

import * as ContractObj from './Contract/index'
globalThis.contract = ContractObj.contract

import * as AntObj from './Ant/index'
globalThis.ant = AntObj

import * as InkObj from './Ink/index'
globalThis.ink = InkObj

import './Blood/index'
import './List/index'

declare global {
    var dice: typeof DiceObj
    var owl: typeof OwlObj
    var ant: typeof AntObj
    var ink: typeof InkObj
    var contract: typeof ContractObj.contract
}
