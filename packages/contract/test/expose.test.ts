import { expose, exposeIt, exposeAll } from '../src/index.js'
import { test, expect } from 'vitest'

export class Host {
    @exposeIt()
    static log() {
        return 'hi'
    }
}

@exposeAll()
export class Host2 {
    static log2() {
        return 'hihi'
    }
}

declare global {
    var log: any
    var log2: any
}

test('expose', () => {
    expect(log()).toBe('hi')
})

test('exposeAll', () => {
    expect(log2()).toBe('hihi')
})
