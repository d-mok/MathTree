
export function bisection(f: Fun, ranges: [number, number][]): number[] {

    function randomPoint(): number[] {
        return ranges.map(([min, max]) => RndR(min, max))
    }

    function randomPosPoint(): number[] {
        for (let i = 0; i < 1000; i++) {
            let a = randomPoint()
            if (f(...a) > 0) return a
        }
        throw "[bisection] can't find positive point"
    }


    function randomNegPoint(): number[] {
        for (let i = 0; i < 1000; i++) {
            let b = randomPoint()
            if (f(...b) < 0) return b
        }
        throw "[bisection] can't find negative point"
    }

    let a = randomPosPoint()
    let b = randomNegPoint()

    function mid(): number[] {
        let m: number[] = []
        for (let i = 0; i < ranges.length; i++) {
            m.push((a[i] + b[i]) / 2)
        }
        return m
    }

    function tolerable(): boolean {
        const TOLERANCE = 0.000000000001
        return ranges.every(([min, max], i) => Math.abs(a[i] - b[i]) <= (max - min) * TOLERANCE)
    }


    for (let i = 0; i < 10000; i++) {
        let m = mid()
        let M = f(...m)
        if (!Number.isFinite(M))
            throw '[bisection] The function value is not a finite number!'
        if (M === 0) return m
        if (M > 0) {
            a = m
        } else {
            b = m
        }
        if (tolerable()) return mid()
    }
    throw '[bisection] fail to find tolarable solution after 10000 iteration'
}

