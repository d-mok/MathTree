import { describe, expect, it } from "vitest";
import { List, list } from "../../src/array/list";
//#region Core
class SubList extends List {
}
function it_preserve_original_list(func) {
    it("preserve original list", () => {
        let ls = list(2, 2, 3, 1, 1, 1, "c", "a", true);
        let clone = list(2, 2, 3, 1, 1, 1, "c", "a", true);
        func(ls);
        expect(ls).toStrictEqual(clone);
    });
}
function it_propagate_subclass_type(func) {
    it("propagate subclass type", () => {
        let ls = new SubList();
        ls.push(2, 2, 3, 1, 1, 1);
        expect(func(ls)).toBeInstanceOf(SubList);
    });
}
function it_propagate_empty_list(func) {
    it("propagate empty list", () => {
        let ls = list();
        expect(func(ls)).toStrictEqual(list());
    });
}
//#endregion
//#region Meta
describe("clear", () => {
    it("clears the list", () => {
        const ls = list(1, 2, 3);
        ls.clear();
        expect(ls).toStrictEqual(list());
    });
});
describe("set", () => {
    it("sets the list", () => {
        const ls = list(1, 2, 3);
        ls.set([4, 5, 6, 7]);
        expect(ls).toStrictEqual(list(4, 5, 6, 7));
    });
});
describe("clone", () => {
    it("returns a clone", () => {
        expect(list(1, 2, 3).clone()).toStrictEqual(list(1, 2, 3));
    });
    it_propagate_empty_list(($) => $.clone());
    it_propagate_subclass_type(($) => $.clone());
    it_preserve_original_list(($) => $.clone());
});
describe("indexValid", () => {
    it("checks the index", () => {
        let ls = list(1, 2, 3);
        expect(ls.indexValid(-1)).toBeFalse();
        expect(ls.indexValid(0)).toBeTrue();
        expect(ls.indexValid(1)).toBeTrue();
        expect(ls.indexValid(2)).toBeTrue();
        expect(ls.indexValid(3)).toBeFalse();
    });
    it("handles empty array", () => {
        let ls = list();
        expect(ls.indexValid(-1)).toBeFalse();
        expect(ls.indexValid(0)).toBeFalse();
        expect(ls.indexValid(1)).toBeFalse();
    });
    it_preserve_original_list(($) => $.indexValid(0));
});
describe("isEmpty", () => {
    it("returns true correctly", () => {
        let ls = list();
        expect(ls.isEmpty()).toBeTrue();
    });
    it("returns false correctly", () => {
        let ls = list(1, 2, 3);
        expect(ls.isEmpty()).toBeFalse();
    });
    it_preserve_original_list(($) => $.isEmpty());
});
//#endregion
//#region Selection function
describe("first", () => {
    it("returns the first item", () => {
        expect(list(7, 2, 4, 3).first()).toBe(7);
    });
    it("returns undefined if empty", () => {
        expect(list().first()).toBeUndefined();
    });
    it_preserve_original_list(($) => $.first());
});
describe("last", () => {
    it("returns the last item", () => {
        expect(list(7, 2, 4, 3).last()).toBe(3);
    });
    it("returns undefined if empty", () => {
        expect(list().last()).toBeUndefined();
    });
    it_preserve_original_list(($) => $.last());
});
describe("cyclicAt", () => {
    it("returns the correct item", () => {
        const ls = list(7, 2, 4, 3);
        expect(ls.cyclicAt(-8)).toBe(7);
        expect(ls.cyclicAt(-7)).toBe(2);
        expect(ls.cyclicAt(-6)).toBe(4);
        expect(ls.cyclicAt(-5)).toBe(3);
        expect(ls.cyclicAt(-4)).toBe(7);
        expect(ls.cyclicAt(-3)).toBe(2);
        expect(ls.cyclicAt(-2)).toBe(4);
        expect(ls.cyclicAt(-1)).toBe(3);
        expect(ls.cyclicAt(0)).toBe(7);
        expect(ls.cyclicAt(1)).toBe(2);
        expect(ls.cyclicAt(2)).toBe(4);
        expect(ls.cyclicAt(3)).toBe(3);
        expect(ls.cyclicAt(4)).toBe(7);
        expect(ls.cyclicAt(5)).toBe(2);
        expect(ls.cyclicAt(6)).toBe(4);
        expect(ls.cyclicAt(7)).toBe(3);
        expect(ls.cyclicAt(8)).toBe(7);
        expect(ls.cyclicAt(9)).toBe(2);
        expect(ls.cyclicAt(10)).toBe(4);
        expect(ls.cyclicAt(11)).toBe(3);
    });
    it("returns undefined if empty", () => {
        expect(list().cyclicAt(0)).toBeUndefined();
    });
    it_preserve_original_list(($) => $.cyclicAt(0));
});
//#endregion
//#region Selection in-place
describe("pull", () => {
    it("returns the pulled element", () => {
        expect(list(7, 2, 4, 3).pull(2)).toBe(4);
    });
    it("remove the pulled element", () => {
        let ls = list(7, 2, 4, 7, 8);
        let pulled = ls.pull(2);
        expect(ls).toStrictEqual(list(7, 2, 7, 8));
        expect(pulled).toBe(4);
    });
    it("works for empty array", () => {
        let ls = list();
        let pulled = ls.pull(2);
        expect(ls).toStrictEqual(list());
        expect(pulled).toBeUndefined();
    });
    it("returns undefined for missing index", () => {
        let ls = list(7, 2, 4, 3);
        let pulled = ls.pull(5);
        expect(ls).toStrictEqual(list(7, 2, 4, 3));
        expect(pulled).toBeUndefined();
    });
    it("returns undefined for negative index", () => {
        let ls = list(7, 2, 4, 3);
        let pulled = ls.pull(-1);
        expect(ls).toStrictEqual(list(7, 2, 4, 3));
        expect(pulled).toBeUndefined();
    });
});
//#endregion
//#region Segment
describe("head", () => {
    it("returns the first n elements", () => {
        expect(list(7, 2, 4, 3, 1).head(3)).toStrictEqual(list(7, 2, 4));
    });
    it("returns all elements if n > length", () => {
        expect(list(7, 2, 4, 3, 1).head(10)).toStrictEqual(list(7, 2, 4, 3, 1));
    });
    it("returns empty array if n <= 0", () => {
        expect(list(7, 2, 4, 3, 1).head(0)).toStrictEqual(list());
        expect(list(7, 2, 4, 3, 1).head(-1)).toStrictEqual(list());
    });
    it_propagate_empty_list(($) => $.head(3));
    it_propagate_subclass_type(($) => $.head(3));
    it_preserve_original_list(($) => $.head(3));
});
describe("tail", () => {
    it("returns the last n elements", () => {
        expect(list(7, 2, 4, 3, 1).tail(3)).toStrictEqual(list(4, 3, 1));
    });
    it("returns all elements if n > length", () => {
        expect(list(7, 2, 4, 3, 1).tail(10)).toStrictEqual(list(7, 2, 4, 3, 1));
    });
    it("returns empty array if n <= 0", () => {
        expect(list(7, 2, 4, 3, 1).tail(0)).toStrictEqual(list());
        expect(list(7, 2, 4, 3, 1).tail(-1)).toStrictEqual(list());
    });
    it_propagate_empty_list(($) => $.tail(3));
    it_propagate_subclass_type(($) => $.tail(3));
    it_preserve_original_list(($) => $.tail(3));
});
describe("before", () => {
    it("returns the elements before index", () => {
        expect(list(7, 2, 4, 3, 1).before(3)).toStrictEqual(list(7, 2, 4));
    });
    it("returns all elements if index >= length", () => {
        expect(list(7, 2, 4, 3, 1).before(5)).toStrictEqual(list(7, 2, 4, 3, 1));
    });
    it("returns empty array if index <= 0", () => {
        expect(list(7, 2, 4, 3, 1).before(-1)).toStrictEqual(list());
        expect(list(7, 2, 4, 3, 1).before(0)).toStrictEqual(list());
    });
    it_propagate_empty_list(($) => $.before(2));
    it_propagate_subclass_type(($) => $.before(2));
    it_preserve_original_list(($) => $.before(2));
});
describe("till", () => {
    it("returns the elements till index", () => {
        expect(list(7, 2, 4, 3, 1).till(3)).toStrictEqual(list(7, 2, 4, 3));
        expect(list(7, 2, 4, 3, 1).till(0)).toStrictEqual(list(7));
    });
    it("returns all elements if index >= length-1", () => {
        expect(list(7, 2, 4, 3, 1).till(4)).toStrictEqual(list(7, 2, 4, 3, 1));
        expect(list(7, 2, 4, 3, 1).till(5)).toStrictEqual(list(7, 2, 4, 3, 1));
    });
    it("returns empty array if index < 0", () => {
        expect(list(7, 2, 4, 3, 1).till(-1)).toStrictEqual(list());
    });
    it_propagate_empty_list(($) => $.till(2));
    it_propagate_subclass_type(($) => $.till(2));
    it_preserve_original_list(($) => $.till(2));
});
describe("after", () => {
    it("returns the elements after index", () => {
        expect(list(7, 2, 4, 3, 1).after(2)).toStrictEqual(list(3, 1));
        expect(list(7, 2, 4, 3, 1).after(0)).toStrictEqual(list(2, 4, 3, 1));
    });
    it("returns empty array if index >= length-1", () => {
        expect(list(7, 2, 4, 3, 1).after(4)).toStrictEqual(list());
    });
    it("returns all elements if index < 0", () => {
        expect(list(7, 2, 4, 3, 1).after(-1)).toStrictEqual(list(7, 2, 4, 3, 1));
    });
    it_propagate_empty_list(($) => $.after(2));
    it_propagate_subclass_type(($) => $.after(2));
    it_preserve_original_list(($) => $.after(2));
});
describe("since", () => {
    it("returns the elements since index", () => {
        expect(list(7, 2, 4, 3, 1).since(2)).toStrictEqual(list(4, 3, 1));
        expect(list(7, 2, 4, 3, 1).since(0)).toStrictEqual(list(7, 2, 4, 3, 1));
    });
    it("returns empty array if index > length-1", () => {
        expect(list(7, 2, 4, 3, 1).since(5)).toStrictEqual(list());
    });
    it("returns all elements if index <= 0", () => {
        expect(list(7, 2, 4, 3, 1).since(0)).toStrictEqual(list(7, 2, 4, 3, 1));
        expect(list(7, 2, 4, 3, 1).since(-1)).toStrictEqual(list(7, 2, 4, 3, 1));
    });
    it_propagate_empty_list(($) => $.since(2));
    it_propagate_subclass_type(($) => $.since(2));
    it_preserve_original_list(($) => $.since(2));
});
describe("chunk", () => {
    it("returns the array of chunks", () => {
        expect(list(1, 2, 3, 4, 5, 6).chunk(2)).toStrictEqual(list(list(1, 2), list(3, 4), list(5, 6)));
    });
    it("handles uneven remainings", () => {
        expect(list(1, 2, 3, 4, 5, 6, 7, 8).chunk(3)).toStrictEqual(list(list(1, 2, 3), list(4, 5, 6), list(7, 8)));
    });
    it("returns empty array if size=0", () => {
        expect(list(1, 2, 3, 4, 5, 6, 7, 8).chunk(0)).toStrictEqual(list());
    });
    it_propagate_empty_list(($) => $.chunk(3));
    it_preserve_original_list(($) => $.chunk(3));
});
describe("split", () => {
    it("returns the array of chunks", () => {
        expect(list(1, 2, 3, 0, 4, 5, 0, 0, 6).split(0)).toStrictEqual(list(list(1, 2, 3), list(4, 5), list(), list(6)));
        list(0, 1, 2, 3, 0, 4, 5, 0, 0, 6, 0).split(0); //?
        expect(list(0, 1, 2, 3, 0, 4, 5, 0, 0, 6, 0).split(0)).toStrictEqual(list(list(), list(1, 2, 3), list(4, 5), list(), list(6), list()));
        expect(list(1, 0, 0, 0, 2).split(0)).toStrictEqual(list(list(1), list(), list(), list(2)));
        expect(list(0).split(0)).toStrictEqual(list(list(), list()));
        expect(list().split(0)).toStrictEqual(list(list()));
    });
    it_preserve_original_list(($) => $.split(3));
});
//#endregion
//#region Containment
describe("includesAll", () => {
    it("returns correct true", () => {
        expect(list(7, 2, 4, 3).includesAll([2, 3, 4])).toBeTrue();
    });
    it("returns correct false", () => {
        expect(list(7, 2, 4, 3).includesAll([2, 3, 4, 8])).toBeFalse();
    });
    it_preserve_original_list(($) => $.includesAll([2, 3, 4]));
});
describe("includesAny", () => {
    it("returns correct true", () => {
        expect(list(7, 2, 4, 3).includesAny([2, 3, 4])).toBeTrue();
        expect(list(7, 2, 4, 3).includesAny([2, 3, 4, 8])).toBeTrue();
        expect(list(7, 2, 4, 3).includesAny([1, 2, 5])).toBeTrue();
    });
    it("returns correct false", () => {
        expect(list(7, 2, 4, 3).includesAny([1, 5])).toBeFalse();
    });
    it_preserve_original_list(($) => $.includesAny([2, 3, 4]));
});
describe("includesExact", () => {
    it("returns correct true", () => {
        expect(list(7, 2, 4, 3).includesExact([2, 7, 3, 4])).toBeTrue();
    });
    it("returns correct false", () => {
        expect(list(7, 2, 4, 3).includesExact([2, 3, 4])).toBeFalse();
    });
    it_preserve_original_list(($) => $.includesExact([2, 3, 4]));
});
describe("belongs", () => {
    it("returns correct true", () => {
        expect(list(7, 2, 4, 3).belongs([2, 3, 4, 7, 8, 9])).toBeTrue();
        expect(list(7, 2, 4, 3).belongs([2, 3, 4, 7])).toBeTrue();
    });
    it("returns correct false", () => {
        expect(list(7, 2, 4, 3).belongs([2, 4, 7])).toBeFalse();
    });
    it_preserve_original_list(($) => $.belongs([2, 4, 7]));
});
//#endregion
//#region Distinct function
describe("unique", () => {
    it("returns a unique list", () => {
        expect(list(2, 2, 3, 1, 1, 1).unique()).toStrictEqual(list(2, 3, 1));
        expect(list([1, 2], [1, 2], [3, 4]).unique()).toStrictEqual(list([1, 2], [1, 2], [3, 4]));
        expect(list([2], [2], [3], [1], [1], [1]).unique()).toStrictEqual(list([2], [2], [3], [1], [1], [1]));
    });
    it_propagate_empty_list(($) => $.unique());
    it_propagate_subclass_type(($) => $.unique());
    it_preserve_original_list(($) => $.unique());
});
describe("uniqueBy", () => {
    it("returns a unique list", () => {
        expect(list(2, 2, 3, 1, 1, 1).uniqueBy(Math.floor)).toStrictEqual(list(2, 3, 1));
        expect(list(1.1, 1.2, 3.5, 3.4, 6.7).uniqueBy(Math.floor)).toStrictEqual(list(1.1, 3.5, 6.7));
        expect(list([1, 2], [1, 2], [3, 4]).uniqueBy(($) => JSON.stringify($))).toStrictEqual(list([1, 2], [3, 4]));
    });
    it_propagate_empty_list(($) => $.uniqueBy(Math.floor));
    it_propagate_subclass_type(($) => $.uniqueBy(Math.floor));
    it_preserve_original_list(($) => $.uniqueBy(Math.floor));
});
describe("uniqueDeep", () => {
    it("returns a unique list", () => {
        expect(list(2, 2, 3, 1, 1, 1).uniqueDeep()).toStrictEqual(list(2, 3, 1));
        expect(list([2], [2], [3], [1], [1], [1]).uniqueDeep()).toStrictEqual(list([2], [3], [1]));
        expect(list(1.1, 1.2, 3.5, 3.4, 6.7).uniqueDeep()).toStrictEqual(list(1.1, 1.2, 3.5, 3.4, 6.7));
        expect(list([1, 2], [1, 2], [3, 4]).uniqueDeep()).toStrictEqual(list([1, 2], [3, 4]));
    });
    it_propagate_empty_list(($) => $.uniqueBy(Math.floor));
    it_propagate_subclass_type(($) => $.uniqueBy(Math.floor));
    it_preserve_original_list(($) => $.uniqueBy(Math.floor));
});
describe("freq", () => {
    it("returns the correct count", () => {
        expect(list(2, 2, 3, 1, 1, 1).freq(1)).toBe(3);
        expect(list(2, 2, 3, 1, 1, 1).freq(2)).toBe(2);
        expect(list(2, 2, 3, 1, 1, 1).freq(3)).toBe(1);
        expect(list(2, 2, 3, 1, 1, 1).freq(4)).toBe(0);
    });
    it_preserve_original_list(($) => $.freq(1));
});
describe("distincts", () => {
    it("returns a list of distinct elements", () => {
        expect(list(1, 2, 2, 3, 4, 4, 4).distincts()).toStrictEqual(list(1, 3));
    });
    it_propagate_empty_list(($) => $.distincts());
    it_propagate_subclass_type(($) => $.distincts());
    it_preserve_original_list(($) => $.distincts());
});
describe("duplicates", () => {
    it("returns a list of duplicates elements", () => {
        expect(list(1, 2, 2, 3, 4, 4, 4).duplicates()).toStrictEqual(list(2, 2, 4, 4, 4));
    });
    it_propagate_empty_list(($) => $.duplicates());
    it_propagate_subclass_type(($) => $.duplicates());
    it_preserve_original_list(($) => $.duplicates());
});
describe("duplicated", () => {
    it("returns a list of duplicated elements", () => {
        expect(list(1, 2, 2, 3, 4, 4, 4).duplicated()).toStrictEqual(list(2, 4));
    });
    it_propagate_empty_list(($) => $.duplicated());
    it_propagate_subclass_type(($) => $.duplicated());
    it_preserve_original_list(($) => $.duplicated());
});
describe("dupless", () => {
    it("returns the correct true", () => {
        expect(list(2, 3, 1).dupless()).toBe(true);
        expect(list([2], [3], [1], [3]).dupless()).toBe(true);
    });
    it("returns the correct false", () => {
        expect(list(2, 3, 1, 3).dupless()).toBe(false);
    });
    it_preserve_original_list(($) => $.dupless());
});
describe("duplessDeep", () => {
    it("returns the correct true", () => {
        expect(list([2], [3], [1]).duplessDeep()).toBe(true);
    });
    it("returns the correct false", () => {
        expect(list(2, 3, 1, 3).duplessDeep()).toBe(false);
        expect(list([2], [3], [1], [3]).duplessDeep()).toBe(false);
    });
    it_preserve_original_list(($) => $.duplessDeep());
});
describe("duppy", () => {
    it("returns the correct true", () => {
        expect(list(2, 3, 1, 3).duppy()).toBe(true);
    });
    it("returns the correct false", () => {
        expect(list(2, 3, 1).duppy()).toBe(false);
    });
    it_preserve_original_list(($) => $.duppy());
});
//#endregion
//#region Distinct in-place
describe("dedup", () => {
    it("deduplicates this list", () => {
        let ls = list(2, 2, 3, 1, 1, 1);
        ls.dedup();
        expect(ls).toStrictEqual(list(2, 3, 1));
    });
});
//#endregion
//#region Filter function
describe("violate", () => {
    it("returns the violated", () => {
        expect(list(1, 2, 4, 3).violate(($) => $ % 2 === 0)).toStrictEqual(list(1, 3));
    });
    it_propagate_empty_list(($) => $.violate(($) => $ % 2 === 0));
    it_propagate_subclass_type(($) => $.violate(($) => $ % 2 === 0));
    it_preserve_original_list(($) => $.violate(($) => $ % 2 === 0));
});
describe("inside", () => {
    it("returns the insiders", () => {
        expect(list(1, 2, 4, 3).inside([2, 5, 1])).toStrictEqual(list(1, 2));
    });
    it("works for empty supply", () => {
        expect(list(1, 2, 4, 3).inside([])).toStrictEqual(list());
    });
    it_propagate_empty_list(($) => $.inside([1, 2, 4, 3]));
    it_propagate_subclass_type(($) => $.inside([1, 2, 4, 3]));
    it_preserve_original_list(($) => $.inside([1, 2, 4, 3]));
});
describe("except", () => {
    it("returns the remaining", () => {
        expect(list(1, 2, 4, 3).except([2, 5, 1])).toStrictEqual(list(4, 3));
    });
    it("works for empty exception", () => {
        expect(list(1, 2, 4, 3).except([])).toStrictEqual(list(1, 2, 4, 3));
    });
    it_propagate_empty_list(($) => $.except([1, 2, 4, 3]));
    it_propagate_subclass_type(($) => $.except([1, 2, 4, 3]));
    it_preserve_original_list(($) => $.except([1, 2, 4, 3]));
});
describe("filterIndex", () => {
    it("returns the filtered array", () => {
        expect(list("a", "b", "c", "d", "e", "f").filterIndex(($) => $ % 2 === 0)).toStrictEqual(list("a", "c", "e"));
    });
    it("works for empty exception", () => {
        expect(list(1, 2, 4, 3).except([])).toStrictEqual(list(1, 2, 4, 3));
    });
    it_propagate_empty_list(($) => $.filterIndex((_) => true));
    it_propagate_subclass_type(($) => $.filterIndex((_) => true));
    it_preserve_original_list(($) => $.filterIndex((_) => true));
});
describe("countIf", () => {
    it("returns the number of elements", () => {
        expect(list(1, 2, 3, 4, 5).countIf(($) => $ % 2 === 0)).toBe(2);
        expect(list(1, 2, 3, 4, 5).countIf(($) => $ % 2 === 1)).toBe(3);
        expect(list(1, 2, 3, 4, 5).countIf(($) => $ === 2)).toBe(1);
        expect(list(1, 2, 3, 4, 5).countIf(($) => $ < 0)).toBe(0);
    });
    it_preserve_original_list(($) => $.countIf(($) => $ < 0));
});
//#endregion
//#region Filter in-place
describe("sieve", () => {
    it("sieve by predicate", () => {
        const ls = list(7, 2, 4, 3);
        ls.sieve(($) => $ % 2 === 0);
        expect(ls).toStrictEqual(list(2, 4));
    });
});
describe("reject", () => {
    it("reject by predicate", () => {
        const ls = list(7, 2, 4, 3);
        ls.reject(($) => $ % 2 === 0);
        expect(ls).toStrictEqual(list(7, 3));
    });
});
describe("keep", () => {
    it("keep the supplied elements", () => {
        const ls = list(7, 2, 4, 3);
        ls.keep([3, 2]);
        expect(ls).toStrictEqual(list(2, 3));
    });
});
describe("drop", () => {
    it("keep the supplied elements", () => {
        const ls = list(7, 2, 4, 3);
        ls.drop([3, 2]);
        expect(ls).toStrictEqual(list(7, 4));
    });
});
//#endregion
//#region Ordering function
describe("reversed", () => {
    it("returns a reversed list", () => {
        expect(list(1, 2, 4, 3).reversed()).toStrictEqual(list(3, 4, 2, 1));
    });
    it_propagate_empty_list(($) => $.reversed());
    it_propagate_subclass_type(($) => $.reversed());
    it_preserve_original_list(($) => $.reversed());
});
describe("ascending", () => {
    it("returns a ascending list", () => {
        expect(list(1, 2, 4, 3).ascending()).toStrictEqual(list(1, 2, 3, 4));
        expect(list(1, 2, 23, 14).ascending()).toStrictEqual(list(1, 2, 14, 23));
        expect(list("a", "c", "b", "d").ascending()).toStrictEqual(list("a", "b", "c", "d"));
    });
    it_propagate_empty_list(($) => $.ascending());
    it_propagate_subclass_type(($) => $.ascending());
    it_preserve_original_list(($) => $.ascending());
});
describe("descending", () => {
    it("returns a descending list", () => {
        expect(list(1, 2, 4, 3).descending()).toStrictEqual(list(4, 3, 2, 1));
        expect(list(1, 2, 23, 14).descending()).toStrictEqual(list(23, 14, 2, 1));
        expect(list("a", "c", "b", "d").descending()).toStrictEqual(list("d", "c", "b", "a"));
    });
    it_propagate_empty_list(($) => $.descending());
    it_propagate_subclass_type(($) => $.descending());
    it_preserve_original_list(($) => $.descending());
});
describe("sorted", () => {
    const evenFirst = (a, b) => (a % 2) - (b % 2);
    const desc = (a, b) => b - a;
    it("returns a sorted array", () => {
        let ls = list(3, 8, 5, 7, 4, 9, 6, 1, 2, 0);
        expect(ls.sorted(evenFirst, desc)).toStrictEqual(list(8, 6, 4, 2, 0, 9, 7, 5, 3, 1));
    });
    it("sorts stably", () => {
        let ls = list(3, 8, 5, 7, 4, 9, 6, 1, 2, 0);
        expect(ls.sorted(evenFirst)).toStrictEqual(list(8, 4, 6, 2, 0, 3, 5, 7, 9, 1));
    });
    it_propagate_empty_list(($) => $.sorted(($) => $));
    it_propagate_subclass_type(($) => $.sorted(($) => $));
    it_preserve_original_list(($) => $.sorted(($) => $));
});
describe("sortedBy", () => {
    it("returns a sorted number array", () => {
        let ls = list(3, 8, 5, 7, 4, 9, 6, 1, 2, 0);
        const parity = ($) => $ % 2;
        const negative = ($) => -$;
        expect(ls.sortedBy(parity, negative)).toStrictEqual(list(8, 6, 4, 2, 0, 9, 7, 5, 3, 1));
    });
    it("returns a sorted string array", () => {
        let ls = list("d", "ddd", "dd", "ee", "cc");
        const length = ($) => $.length;
        const initial = ($) => $[0];
        expect(ls.sortedBy(length, initial)).toStrictEqual(list("d", "cc", "dd", "ee", "ddd"));
        expect(ls.sortedBy(initial, length)).toStrictEqual(list("cc", "d", "dd", "ddd", "ee"));
    });
    it_propagate_empty_list(($) => $.sortedBy(($) => $));
    it_propagate_subclass_type(($) => $.sortedBy(($) => $));
    it_preserve_original_list(($) => $.sortedBy(($) => $));
});
describe("sortedByFreq", () => {
    it("returns a sorted number array", () => {
        let ls = list(5, 6, 7, 6, 6, 7, 8);
        expect(ls.sortedByFreq()).toStrictEqual(list(6, 6, 6, 7, 7, 5, 8));
    });
    it("returns a sorted string array", () => {
        let ls = list("d", "d", "d", "e", "c", "e", "f");
        expect(ls.sortedByFreq()).toStrictEqual(list("d", "d", "d", "e", "e", "c", "f"));
    });
    it_propagate_empty_list(($) => $.sortedByFreq());
    it_propagate_subclass_type(($) => $.sortedByFreq());
    it_preserve_original_list(($) => $.sortedByFreq());
});
//#endregion
//#region Ordering in-place
describe("ascend", () => {
    it("ascend this list", () => {
        let ls = list(1, 2, 4, 3);
        ls.ascend();
        expect(ls).toStrictEqual(list(1, 2, 3, 4));
    });
});
describe("descend", () => {
    it("descend this list", () => {
        let ls = list(1, 2, 4, 3);
        ls.descend();
        expect(ls).toStrictEqual(list(4, 3, 2, 1));
    });
});
describe("arrange", () => {
    it("arrange this list", () => {
        let ls = list("a", "b", "c", "d");
        ls.arrange([2, 1, 3, 0]);
        expect(ls).toStrictEqual(list("d", "b", "a", "c"));
    });
});
describe("permute", () => {
    it("permute this list", () => {
        let ls = list("a", "b", "c", "d");
        ls.permute([2, 1, 3, 0]);
        expect(ls).toStrictEqual(list("c", "b", "d", "a"));
    });
});
describe("sorts", () => {
    const evenFirst = (a, b) => (a % 2) - (b % 2);
    const desc = (a, b) => b - a;
    it("sorts this list", () => {
        let ls = list(3, 8, 5, 7, 4, 9, 6, 1, 2, 0);
        ls.sorts(evenFirst, desc);
        expect(ls).toStrictEqual(list(8, 6, 4, 2, 0, 9, 7, 5, 3, 1));
    });
    it("sorts this list stably", () => {
        let ls = list(3, 8, 5, 7, 4, 9, 6, 1, 2, 0);
        ls.sorts(evenFirst);
        expect(ls).toStrictEqual(list(8, 4, 6, 2, 0, 3, 5, 7, 9, 1));
    });
});
describe("sortBy", () => {
    it("sort a number list by mappers", () => {
        let ls = list(3, 8, 5, 7, 4, 9, 6, 1, 2, 0);
        const parity = ($) => $ % 2;
        const negative = ($) => -$;
        ls.sortBy(parity, negative);
        expect(ls).toStrictEqual(list(8, 6, 4, 2, 0, 9, 7, 5, 3, 1));
    });
    it("sort a string list by mappers", () => {
        let ls = list("d", "ddd", "dd", "ee", "cc");
        const length = ($) => $.length;
        const initial = ($) => $[0];
        ls.sortBy(length, initial);
        expect(ls).toStrictEqual(list("d", "cc", "dd", "ee", "ddd"));
        ls.sortBy(initial, length);
        expect(ls).toStrictEqual(list("cc", "d", "dd", "ddd", "ee"));
    });
});
describe("cycle", () => {
    it("cycle this list", () => {
        let ls = list("a", "b", "c", "d");
        ls.cycle(2);
        expect(ls).toStrictEqual(list("c", "d", "a", "b"));
    });
    it("cycle this list backwards", () => {
        let ls = list("a", "b", "c", "d");
        ls.cycle(-1);
        expect(ls).toStrictEqual(list("d", "a", "b", "c"));
    });
    it("works for empty list", () => {
        let ls = list();
        ls.cycle(2);
        expect(ls).toStrictEqual(list());
    });
    it("works for n=0", () => {
        let ls = list("a", "b", "c", "d");
        ls.cycle(0);
        expect(ls).toStrictEqual(list("a", "b", "c", "d"));
    });
});
//#endregion
//#region Random function
describe("randomIndex", () => {
    for (let n = 0; n < 100; n++) {
        it("returns a random index", () => {
            let i = list("a", "b", "c", "d").randomIndex();
            expect([0, 1, 2, 3]).toContain(i);
        });
    }
    it("returns undefined if array is empty", () => {
        expect(list().randomIndex()).toBeUndefined();
    });
    it_preserve_original_list(($) => $.randomIndex());
});
describe("draw", () => {
    for (let n = 0; n < 100; n++) {
        it("returns a random element", () => {
            let ele = list("a", "b", "c", "d").draw();
            expect(["a", "b", "c", "d"]).toContain(ele);
        });
    }
    it("returns undefined if array is empty", () => {
        expect(list().draw()).toBeUndefined();
    });
    it_preserve_original_list(($) => $.draw());
});
describe("draws", () => {
    for (let n = 0; n < 100; n++) {
        it("returns a random sample", () => {
            let ls = list("a", "b", "c", "d").draws(2);
            expect(ls).toHaveLength(2);
            expect(["a", "b", "c", "d"]).toIncludeAllMembers(ls);
            let ls2 = list("a", "b", "c", "d").draws(6);
            expect(ls2).toHaveLength(6);
            expect(["a", "b", "c", "d"]).toIncludeAllMembers(ls2);
        });
    }
    it_propagate_subclass_type(($) => $.draws(2));
    it_preserve_original_list(($) => $.draws(2));
});
describe("sample", () => {
    for (let n = 0; n < 100; n++) {
        it("returns a random sample", () => {
            let ls = list("a", "b", "c", "d").sample(2);
            expect(ls).toHaveLength(2);
            expect(["a", "b", "c", "d"]).toIncludeAllMembers(ls);
        });
    }
    it("returns undefined if n > length", () => {
        expect(list("a", "b", "c", "d").sample(6)).toBeUndefined();
    });
    it_propagate_subclass_type(($) => $.sample(2));
    it_preserve_original_list(($) => $.sample(2));
});
describe("shuffled", () => {
    for (let n = 0; n < 100; n++) {
        it("returns a shuffled array", () => {
            let ls = list("a", "b", "c", "d").shuffled();
            expect(ls).toHaveLength(4);
            expect(ls).toIncludeSameMembers(["a", "b", "c", "d"]);
        });
    }
    it_propagate_subclass_type(($) => $.shuffled());
    it_preserve_original_list(($) => $.shuffled());
});
//#endregion
//#region Random in-place
describe("deal", () => {
    for (let n = 0; n < 100; n++) {
        it("returns and pulls a random element", () => {
            let ls = list("a", "b", "c", "d");
            let ele = ls.deal();
            expect(["a", "b", "c", "d"]).toContain(ele);
            expect(ls).not.toContain(ele);
            expect(ls).toHaveLength(3);
        });
    }
    it("returns undefined if array is empty", () => {
        expect(list().deal()).toBeUndefined();
    });
});
describe("shuffle", () => {
    for (let n = 0; n < 100; n++) {
        it("returns a shuffled array", () => {
            let ls = list("a", "b", "c", "d");
            ls.shuffle();
            expect(ls).toHaveLength(4);
            expect(ls).toIncludeSameMembers(["a", "b", "c", "d"]);
        });
    }
});
//#endregion
//#region Combinatorics
describe("combinations", () => {
    it("returns a list of combinations", () => {
        let ls = list(1, 2, 3, 4);
        expect(ls.combinations(0)).toStrictEqual(list());
        expect(ls.combinations(1)).toStrictEqual(list(list(1), list(2), list(3), list(4)));
        expect(ls.combinations(2)).toStrictEqual(list(list(1, 2), list(1, 3), list(1, 4), list(2, 3), list(2, 4), list(3, 4)));
        expect(ls.combinations(3)).toStrictEqual(list(list(1, 2, 3), list(1, 2, 4), list(1, 3, 4), list(2, 3, 4)));
        expect(ls.combinations(4)).toStrictEqual(list(list(1, 2, 3, 4)));
    });
    it_propagate_empty_list(($) => $.combinations(2));
    it_preserve_original_list(($) => $.combinations(2));
});
describe("pairs", () => {
    it("returns a list of apirs", () => {
        let ls = list(1, 2, 3, 4);
        expect(ls.pairs()).toStrictEqual(list(list(1, 2), list(1, 3), list(1, 4), list(2, 3), list(2, 4), list(3, 4)));
    });
    it_propagate_empty_list(($) => $.pairs());
    it_preserve_original_list(($) => $.pairs());
});
describe("permutations", () => {
    it("returns a list of permutations", () => {
        expect(list().permutations()).toStrictEqual(list());
        expect(list(1).permutations()).toStrictEqual(list(list(1)));
        expect(list(1, 2).permutations()).toStrictEqual(list(list(1, 2), list(2, 1)));
        expect(list(1, 2, 3).permutations()).toStrictEqual(list(list(1, 2, 3), list(1, 3, 2), list(2, 1, 3), list(2, 3, 1), list(3, 1, 2), list(3, 2, 1)));
        let L4 = list(1, 2, 3, 4).permutations();
        expect(L4).toHaveLength(24);
        for (let l of L4) {
            expect(l).toIncludeSameMembers([1, 2, 3, 4]);
        }
        let L5 = list(1, 2, 3, 4, 5).permutations();
        expect(L5).toHaveLength(120);
        for (let l of L5) {
            expect(l).toIncludeSameMembers([1, 2, 3, 4, 5]);
        }
    });
    it_propagate_empty_list(($) => $.permutations());
    it_preserve_original_list(($) => $.permutations());
});
//#endregion
//#region Transform function
describe("zip", () => {
    let sum = (a, b) => a + b;
    it("returns the mapper results", () => {
        let arr = list(1, 2, 3).zip([5, 7, 9], sum);
        expect(arr).toStrictEqual(list(6, 9, 12));
    });
    it_propagate_empty_list(($) => $.zip([5, 7, 9], sum));
    it_preserve_original_list(($) => $.zip([5, 7, 9], sum));
});
//#endregion
//#region Metric function
describe("meanOf", () => {
    let length = ($) => $.length;
    let floor = ($) => Math.floor($);
    it("returns the mean of metric", () => {
        expect(list("a", "b", "cc", "dddd").meanOf(length)).toBe(2);
        expect(list(5.2, 6.3, 7.4).meanOf(floor)).toBe(6);
    });
    it_preserve_original_list(($) => $.meanOf(length));
});
describe("maxOf", () => {
    let length = ($) => $.length;
    let floor = ($) => Math.floor($);
    it("returns the max of metric", () => {
        let L1 = list("aaa", "bbb", "c", "ddddd", "ee");
        expect(L1.maxOf(length)).toBe(5);
        expect(L1.maxOf(length, 1)).toBe(5);
        expect(L1.maxOf(length, 2)).toBe(3);
        expect(L1.maxOf(length, 3)).toBe(2);
        expect(L1.maxOf(length, 4)).toBe(1);
        expect(L1.maxOf(length, 5)).toBeNaN();
        let L2 = list(2.1, 2.3, 6.5, 4.1);
        expect(L2.maxOf(floor)).toBe(6);
        expect(L2.maxOf(floor, 1)).toBe(6);
        expect(L2.maxOf(floor, 2)).toBe(4);
        expect(L2.maxOf(floor, 3)).toBe(2);
        expect(L2.maxOf(floor, 4)).toBeNaN();
    });
    it("returns NaN for empty array", () => {
        expect(list().maxOf(length)).toBeNaN();
    });
    it_preserve_original_list(($) => $.maxOf(length));
});
describe("minOf", () => {
    let length = ($) => $.length;
    let floor = ($) => Math.floor($);
    it("returns the min of metric", () => {
        let L1 = list("aaa", "bbb", "c", "ddddd", "ee");
        expect(L1.minOf(length)).toBe(1);
        expect(L1.minOf(length, 1)).toBe(1);
        expect(L1.minOf(length, 2)).toBe(2);
        expect(L1.minOf(length, 3)).toBe(3);
        expect(L1.minOf(length, 4)).toBe(5);
        expect(L1.minOf(length, 5)).toBeNaN();
        let L2 = list(2.1, 2.3, 6.5, 4.1);
        expect(L2.minOf(floor)).toBe(2);
        expect(L2.minOf(floor, 1)).toBe(2);
        expect(L2.minOf(floor, 2)).toBe(4);
        expect(L2.minOf(floor, 3)).toBe(6);
        expect(L2.minOf(floor, 4)).toBeNaN();
    });
    it("returns NaN for empty array", () => {
        expect(list().minOf(length)).toBeNaN();
    });
    it_preserve_original_list(($) => $.minOf(length));
});
describe("maxsBy", () => {
    let length = ($) => $.length;
    let floor = ($) => Math.floor($);
    it("returns the elements at max", () => {
        let L1 = list("aaa", "bbb", "c", "ddd", "ee");
        expect(L1.maxsBy(length)).toStrictEqual(list("aaa", "bbb", "ddd"));
        expect(L1.maxsBy(length, 1)).toStrictEqual(list("aaa", "bbb", "ddd"));
        expect(L1.maxsBy(length, 2)).toStrictEqual(list("ee"));
        expect(L1.maxsBy(length, 3)).toStrictEqual(list("c"));
        expect(L1.maxsBy(length, 4)).toStrictEqual(list());
        let L2 = list(2.1, 2.3, 6.5, 4.1);
        expect(L2.maxsBy(floor)).toStrictEqual(list(6.5));
        expect(L2.maxsBy(floor, 1)).toStrictEqual(list(6.5));
        expect(L2.maxsBy(floor, 2)).toStrictEqual(list(4.1));
        expect(L2.maxsBy(floor, 3)).toStrictEqual(list(2.1, 2.3));
        expect(L2.maxsBy(floor, 4)).toStrictEqual(list());
    });
    it_propagate_empty_list(($) => $.maxsBy(length));
    it_propagate_subclass_type(($) => $.maxsBy(length));
    it_preserve_original_list(($) => $.maxsBy(length));
});
describe("minsBy", () => {
    let length = ($) => $.length;
    let floor = ($) => Math.floor($);
    it("returns the elements at min", () => {
        let L1 = list("aaa", "b", "c", "ddd", "ee");
        expect(L1.minsBy(length)).toStrictEqual(list("b", "c"));
        expect(L1.minsBy(length, 1)).toStrictEqual(list("b", "c"));
        expect(L1.minsBy(length, 2)).toStrictEqual(list("ee"));
        expect(L1.minsBy(length, 3)).toStrictEqual(list("aaa", "ddd"));
        expect(L1.minsBy(length, 4)).toStrictEqual(list());
        let L2 = list(2.1, 2.3, 6.5, 4.1);
        expect(L2.minsBy(floor)).toStrictEqual(list(2.1, 2.3));
        expect(L2.minsBy(floor, 1)).toStrictEqual(list(2.1, 2.3));
        expect(L2.minsBy(floor, 2)).toStrictEqual(list(4.1));
        expect(L2.minsBy(floor, 3)).toStrictEqual(list(6.5));
        expect(L2.minsBy(floor, 4)).toStrictEqual(list());
    });
    it_propagate_empty_list(($) => $.minsBy(length));
    it_propagate_subclass_type(($) => $.minsBy(length));
    it_preserve_original_list(($) => $.minsBy(length));
});
describe("maxBy", () => {
    let length = ($) => $.length;
    let floor = ($) => Math.floor($);
    it("returns the first element at max", () => {
        let L1 = list("aaa", "bbb", "c", "ddd", "ee");
        expect(L1.maxBy(length)).toBe("aaa");
        expect(L1.maxBy(length, 1)).toBe("aaa");
        expect(L1.maxBy(length, 2)).toBe("ee");
        expect(L1.maxBy(length, 3)).toBe("c");
        expect(L1.maxBy(length, 4)).toBeUndefined();
        let L2 = list(2.1, 2.3, 6.5, 4.1);
        expect(L2.maxBy(floor)).toBe(6.5);
        expect(L2.maxBy(floor, 1)).toBe(6.5);
        expect(L2.maxBy(floor, 2)).toBe(4.1);
        expect(L2.maxBy(floor, 3)).toBe(2.1);
        expect(L2.maxBy(floor, 4)).toBeUndefined();
    });
    it("returns undefined for empty array", () => {
        expect(list().maxBy(length)).toBeUndefined();
    });
    it_preserve_original_list(($) => $.maxBy(length));
});
describe("minBy", () => {
    let length = ($) => $.length;
    let floor = ($) => Math.floor($);
    it("returns the first element at max", () => {
        let L1 = list("aaa", "bbb", "c", "ddd", "ee");
        expect(L1.minBy(length)).toBe("c");
        expect(L1.minBy(length, 1)).toBe("c");
        expect(L1.minBy(length, 2)).toBe("ee");
        expect(L1.minBy(length, 3)).toBe("aaa");
        expect(L1.minBy(length, 4)).toBeUndefined();
        let L2 = list(2.1, 2.3, 6.5, 4.1);
        expect(L2.minBy(floor)).toBe(2.1);
        expect(L2.minBy(floor, 1)).toBe(2.1);
        expect(L2.minBy(floor, 2)).toBe(4.1);
        expect(L2.minBy(floor, 3)).toBe(6.5);
        expect(L2.minBy(floor, 4)).toBeUndefined();
    });
    it("returns undefined for empty array", () => {
        expect(list().minBy(length)).toBeUndefined();
    });
    it_preserve_original_list(($) => $.minBy(length));
});
//#endregion
//#region Padding function
describe("padTail", () => {
    it("returns the padded array", () => {
        expect(list(1, 2, 3).padTail(5)).toStrictEqual(list(1, 2, 3, 3, 3));
        expect(list(1, 2, 3).padTail(10)).toStrictEqual(list(1, 2, 3, 3, 3, 3, 3, 3, 3, 3));
        expect(list(1, 2, 3).padTail(2)).toStrictEqual(list(1, 2, 3));
        expect(list(1, 2, 3).padTail(3)).toStrictEqual(list(1, 2, 3));
    });
    it_propagate_empty_list(($) => $.padTail(2));
    it_propagate_subclass_type(($) => $.padTail(2));
    it_preserve_original_list(($) => $.padTail(2));
});
describe("padHead", () => {
    it("returns the padded array", () => {
        expect(list(1, 2, 3).padHead(5)).toStrictEqual(list(1, 1, 1, 2, 3));
        expect(list(1, 2, 3).padHead(10)).toStrictEqual(list(1, 1, 1, 1, 1, 1, 1, 1, 2, 3));
        expect(list(1, 2, 3).padHead(2)).toStrictEqual(list(1, 2, 3));
        expect(list(1, 2, 3).padHead(3)).toStrictEqual(list(1, 2, 3));
    });
    it_propagate_empty_list(($) => $.padHead(2));
    it_propagate_subclass_type(($) => $.padHead(2));
    it_preserve_original_list(($) => $.padHead(2));
});
describe("padCyclic", () => {
    it("returns the padded array", () => {
        expect(list(1, 2, 3).padCyclic(5)).toStrictEqual(list(1, 2, 3, 1, 2));
        expect(list(1, 2, 3).padCyclic(10)).toStrictEqual(list(1, 2, 3, 1, 2, 3, 1, 2, 3, 1));
        expect(list(1, 2, 3).padCyclic(2)).toStrictEqual(list(1, 2, 3));
        expect(list(1, 2, 3).padCyclic(3)).toStrictEqual(list(1, 2, 3));
    });
    it_propagate_empty_list(($) => $.padCyclic(2));
    it_propagate_subclass_type(($) => $.padCyclic(2));
    it_preserve_original_list(($) => $.padCyclic(2));
});
//#endregion
//#region Native
describe("native of", () => {
    it("returns a List instance", () => {
        const ls = list(1, 2, 3);
        expect(ls).toBeInstanceOf(List);
        expect(ls).toBeInstanceOf(Array);
    });
});
describe("native filter", () => {
    it("returns a List instance", () => {
        const ls = list(1, 2, 3).filter(($) => $ > 1);
        expect(ls).toBeInstanceOf(List);
        expect(ls).toBeInstanceOf(Array);
    });
});
describe("native map", () => {
    it("returns a List instance", () => {
        const ls = list(1, 2, 3).map(($) => $ + 1);
        expect(ls).toBeInstanceOf(List);
        expect(ls).toBeInstanceOf(Array);
    });
});
describe("native flat", () => {
    it("returns a List instance", () => {
        const ls = list([1], [2], [3]).flat();
        expect(ls).toBeInstanceOf(List);
        expect(ls).toBeInstanceOf(Array);
    });
});
//#endregion
//#region Creator
describe("creator list", () => {
    it("returns a List object", () => {
        const ls = new List();
        ls.push(1, 2, 3);
        expect(list(1, 2, 3)).toStrictEqual(ls);
        expect(list(1, 2, 3)).toBeInstanceOf(Array);
        expect(list(1, 2, 3)).toBeInstanceOf(List);
    });
});
//#endregion
//# sourceMappingURL=list.test.js.map