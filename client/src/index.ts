import { Seed, SeedRow } from './seed'
import { Fruit } from './MathSoil'

function cloneJSON<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj))
}

function ErrIdNotFound(id: string): never {
    throw 'Error! Seed ' + id + ' not found during fetching!'
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
            .map(id => json.find($ => $.id === id) ?? ErrIdNotFound(id))
            .map($ => cloneJSON($))
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
        this.cycle()
        this.growFirst()
    }

    cycle(): void {
        this.push(this.shift()!)
    }

    shuffle(): void {
        for (let i = this.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)) // random from 0 to i
            ;[this[i], this[j]] = [this[j], this[i]]
        }
    }

    clear(): void {
        this.length = 0
    }
}
