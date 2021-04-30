import * as DiceObj from './Dice/index';
import * as OwlObj from './Owl/index';
import * as ContractObj from './Contract/index';
import './Blood/index';
declare global {
    var dice: typeof DiceObj;
    var owl: typeof OwlObj;
    var contract: typeof ContractObj.contract;
}
