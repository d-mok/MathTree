import _ from 'lodash';
import * as math from 'mathjs';
function median(nums) {
    return math.median(...nums);
}
function mode(nums) {
    return math.mode(...nums);
}
function std(nums) {
    return math.std(nums, 'uncorrected');
}
_.mixin({ median, mode, std });
//# sourceMappingURL=stat.js.map