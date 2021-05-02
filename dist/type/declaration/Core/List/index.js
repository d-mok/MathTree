var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "lodash"], function (require, exports, lodash_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Clone = void 0;
    lodash_1 = __importDefault(lodash_1);
    function Clone(object) {
        return lodash_1.default.cloneDeep(object);
    }
    exports.Clone = Clone;
    class ListCls extends Array {
        constructor(arr, keyFunc = x => JSON.stringify(x)) {
            super();
            this.push(...arr);
            this.key = keyFunc;
        }
        isDistinct() {
            return this.length === this.distinctLength();
        }
        distinctLength() {
            return this.distinct().length;
        }
        distinct() {
            return lodash_1.default.uniqBy(this, this.key);
        }
        pairs() {
            let len = this.length;
            let arr = [];
            for (let i = 0; i < len; i++) {
                for (let j = i + 1; j < len; j++) {
                    arr.push([this[i], this[j]]);
                }
            }
            return arr;
        }
        pairsEvery(relation) {
            return this.pairs().every(p => relation(p[0], p[1]));
        }
        pluck(index) {
            return this.map(x => x[index]);
        }
    }
    function List(arr, keyFunc = x => JSON.stringify(x)) {
        return new ListCls(arr, keyFunc);
    }
    globalThis.List = List;
});
