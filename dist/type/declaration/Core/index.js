var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define(["require", "exports", "./Dice/index", "./Owl/index", "./Contract/index", "./Ant/index", "./Ink/index", "./Blood/index", "./List/index"], function (require, exports, DiceObj, OwlObj, ContractObj, AntObj, InkObj) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    DiceObj = __importStar(DiceObj);
    OwlObj = __importStar(OwlObj);
    ContractObj = __importStar(ContractObj);
    AntObj = __importStar(AntObj);
    InkObj = __importStar(InkObj);
    globalThis.dice = DiceObj;
    globalThis.owl = OwlObj;
    globalThis.contract = ContractObj.contract;
    globalThis.ant = AntObj;
    globalThis.ink = InkObj;
});
