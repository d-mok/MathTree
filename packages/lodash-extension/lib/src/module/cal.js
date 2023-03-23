import _ from 'lodash';
import * as math from 'mathjs';
import * as cal from '../cal';
function blur(num) {
    return cal.blur(num);
}
function hcf(nums) {
    if (nums.length === 0)
        return NaN;
    if (nums.length === 1)
        return nums[0];
    //@ts-ignore
    return math.gcd(...nums);
}
function lcm(nums) {
    if (nums.length === 0)
        return NaN;
    if (nums.length === 1)
        return nums[0];
    //@ts-ignore
    return math.lcm(...nums);
}
function toFraction(num) {
    return cal.toFraction(num);
}
/**
 * Return an array of integral ratio. All inputs will be forced into fraction first.
 * ```
 * [2,4,6].ratio() // [1,2,3]
 * [0,4,6].ratio() // [0,2,3]
 * [1.5,2.5,3.5].ratio() // [3,5,7]
 * ```
 */
function toIntRatio(nums) {
    if (_.without(nums, 0).length === 0)
        return [...nums];
    let fracs = nums.map(_.toFraction);
    let denos = fracs.map($ => $[1]);
    let multiple = _.lcm(denos);
    let ints = nums.map($ => $ * multiple).map(_.blur);
    let HCF = _.hcf(ints);
    return ints.map($ => $ / HCF).map(_.blur);
}
_.mixin({ blur, hcf, lcm, toFraction, toIntRatio });
//# sourceMappingURL=cal.js.map