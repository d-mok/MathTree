import { Seed, SeedRow } from './seed'
import { Fruit } from './MathSoil'
import 'sapphire-js'

function dummySeedRow(idNotFound: string): SeedRow {
    console.error('ERROR! Seed ' + idNotFound + ' not found during fetching!')

    return {
        id: 'NOT_FOUND_' + crypto.randomUUID().left(4),
        qn: 'Question not found!',
        sol: 'Question not found!',
        populate: '',
        validate: '',
        preprocess: '',
        postprocess: '',
    }
}

export abstract class SeedArray extends Array<Seed> {
    protected abstract SUPABASE_URL: string
    protected abstract SUPABASE_ANON_KEY: string

    private async fetchAPI(ids: string[]): Promise<Seed[]> {
        const url = this.SUPABASE_URL + '(' + ids.join(',') + ')'
        const response = await fetch(url, {
            headers: {
                apikey: this.SUPABASE_ANON_KEY,
                Authorization: 'Bearer ' + this.SUPABASE_ANON_KEY,
            },
        })
        let json: SeedRow[] = await response.json()
        return ids
            .map(id => json.get({ id }) ?? dummySeedRow(id))
            .map($ => new Seed($))
    }

    async refreshByIds(ids: string[]) {
        this.clear()
        let seeds = await this.fetchAPI(ids)
        this.push(...seeds)
    }

    async replaceById(index: number, id: string) {
        let seeds = await this.fetchAPI([id])
        this[index] = seeds[0]
    }

    ids(): string[] {
        return this.map($ => $.id)
    }

    fruits(): Fruit[] {
        return this.map($ => $.fruit)
    }

    growAll() {
        for (let s of this) s.grow()
    }

    growFirst() {
        this[0].grow()
    }

    tick() {
        this.cycle(1)
        this.growFirst()
    }
}
