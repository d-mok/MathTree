import * as DiceObj from './Dice/index';
import * as OwlObj from './Owl/index';
import * as ContractObj from './Contract/index';
import * as AntObj from './Ant/index';
import * as InkObj from './Ink/index';
import './Blood/index';
import './List/index';
declare global {
    var dice: typeof DiceObj;
    var owl: typeof OwlObj;
    var ant: typeof AntObj;
    var ink: typeof InkObj;
    var contract: typeof ContractObj.contract;
}
