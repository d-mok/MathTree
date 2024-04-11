"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedArray = void 0;
const seed_1 = require("./seed");
require("sapphire-js");
function dummySeedRow(idNotFound) {
    console.error('ERROR! Seed ' + idNotFound + ' not found during fetching!');
    return {
        id: 'NOT_FOUND_' + crypto.randomUUID().left(4),
        qn: 'Question not found!',
        sol: 'Question not found!',
        populate: '',
        validate: '',
        preprocess: '',
        postprocess: '',
    };
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
            .map(id => json.get({ id }) ?? dummySeedRow(id))
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
        this.cycle(1);
        this.growFirst();
    }
}
exports.SeedArray = SeedArray;
//# sourceMappingURL=index.js.map