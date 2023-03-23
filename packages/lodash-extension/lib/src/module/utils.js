import _ from 'lodash';
function combinations(collection, n) {
    let array = _.values(collection);
    if (array.length < n)
        return [];
    function recur(array, n) {
        if (--n < 0)
            return [[]];
        let combinations = [];
        array = array.slice();
        while (array.length - n) {
            let value = array.shift();
            recur(array, n).forEach(combination => {
                combination.unshift(value);
                combinations.push(combination);
            });
        }
        return combinations;
    }
    return recur(array, n);
}
function uniqDeep(array) {
    return _.uniqWith(array, _.isEqual);
}
function isUniq(array) {
    return _.uniq(array).length === array.length;
}
function isUniqDeep(array) {
    return _.uniqWith(array, _.isEqual).length === array.length;
}
function count(array, item) {
    return array.filter($ => $ === item).length;
}
function cyclicAt(array, index) {
    let n = array.length;
    if (n === 0)
        return undefined;
    while (index < 0) {
        index += n;
    }
    while (index > n - 1) {
        index -= n;
    }
    return array[index];
}
_.mixin({ combinations, uniqDeep, isUniq, isUniqDeep, count, cyclicAt });
//# sourceMappingURL=utils.js.map