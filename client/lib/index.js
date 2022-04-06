"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seeds = void 0;
const type_1 = require("./type");
function cloneJSON(obj) {
    return JSON.parse(JSON.stringify(obj));
}
function ErrIdNotFound(id) {
    throw 'Error! Seed ' + id + ' not found during fetching!';
}
class Seeds extends Array {
    async fetchAPI(ids) {
        const url = this.SUPABASE_URL + '(' + ids.join(',') + ')';
        const response = await fetch(url, {
            headers: {
                apikey: this.SUPABASE_ANON_KEY,
                Authorization: 'Bearer ' + this.SUPABASE_ANON_KEY
            }
        });
        let json = await response.json();
        return ids
            .map(id => json.find($ => $.id === id) ?? ErrIdNotFound(id))
            .map($ => cloneJSON($))
            .map($ => new type_1.Seed($));
    }
    async refreshByIds(ids) {
        this.clear();
        let seeds = await this.fetchAPI(ids);
        this.push(...seeds);
    }
    async replaceById(index, id) {
        let seeds = await this.fetchAPI([id]);
        this[index] = seeds[0];
    }
    growAll() {
        for (let s of this)
            s.grow();
    }
    growFirst() {
        this[0].grow();
    }
    tick() {
        this.cycle(1);
        this.growFirst();
    }
    /**
     * Cycle the order of elements in-place by `n` steps.
     * @param n - number to step to cycle
     * ```
     * [1,2,3,4,5].cycle(2) // [3,4,5,1,2]
     * [1,2,3,4,5].cycle(-2) // [4,5,1,2,3]
     * ```
     */
    cycle(n) {
        if (this.length === 0)
            return;
        if (n === 0)
            return;
        if (n > 0) {
            for (let i = 1; i <= n; i++) {
                this.push(this.shift());
            }
        }
        if (n < 0) {
            n = Math.abs(n);
            for (let i = 1; i <= n; i++) {
                this.unshift(this.pop());
            }
        }
    }
    /**
     * Shuffle this array in-place.
     * ```
     * [1,2,3].shuffle() //-> [2,1,3] or [3,1,2] or ...
     * ```
     */
    shuffle() {
        for (let i = this.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random from 0 to i
            [this[i], this[j]] = [this[j], this[i]];
        }
    }
    clear() {
        this.length = 0;
    }
}
exports.Seeds = Seeds;
//# sourceMappingURL=index.js.map