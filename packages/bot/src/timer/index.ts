
export class Timer {
    private start: number = Date.now()

    constructor(
        private limit: number // in second
    ) { }

    elapsed(): number {
        return (Date.now() - this.start) / 1000 // in second
    }

    over(): boolean {
        return this.elapsed() > this.limit
    }

    check(): void {
        if (this.over()) {
            let e = Error(`running too long: > ${this.limit}s`)
            e.name = 'TimeoutError'
            throw e
        }
    }
}

