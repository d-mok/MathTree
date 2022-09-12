"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedArray = void 0;
const seed_1 = require("./seed");
function cloneJSON(obj) {
    return JSON.parse(JSON.stringify(obj));
}
function ErrIdNotFound(id) {
    throw 'Error! Seed ' + id + ' not found during fetching!';
}
class SeedArray extends Array {
    async fetchAPI(ids) {
        const url = this.SUPABASE_URL + '(' + ids.join(',') + ')';
        const response = await fetch(url, {
            headers: {
                apikey: this.SUPABASE_ANON_KEY,
                Authorization: 'Bearer ' + this.SUPABASE_ANON_KEY,
            },
        });
        let json = await response.json();
        return ids
            .map(id => json.find($ => $.id === id) ?? ErrIdNotFound(id))
            .map($ => cloneJSON($))
            .map($ => new seed_1.Seed($));
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
    ids() {
        return this.map($ => $.id);
    }
    fruits() {
        return this.map($ => $.fruit);
    }
    growAll() {
        for (let s of this)
            s.grow();
    }
    growFirst() {
        this[0].grow();
    }
    tick() {
        this.cycle();
        this.growFirst();
    }
    cycle() {
        this.push(this.shift());
    }
    shuffle() {
        for (let i = this.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)) // random from 0 to i
            ;
            [this[i], this[j]] = [this[j], this[i]];
        }
    }
    clear() {
        this.length = 0;
    }
}
exports.SeedArray = SeedArray;
//# sourceMappingURL=index.js.map