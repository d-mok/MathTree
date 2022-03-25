export class Timer {
    constructor(limit // in second
    ) {
        this.limit = limit;
        this.start = Date.now();
    }
    elapsed() {
        return (Date.now() - this.start) / 1000; // in second
    }
    over() {
        return this.elapsed() > this.limit;
    }
    check() {
        if (this.over()) {
            let e = Error(`running too long: > ${this.limit}s`);
            e.name = 'TimeoutError';
            throw e;
        }
    }
}
//# sourceMappingURL=index.js.map