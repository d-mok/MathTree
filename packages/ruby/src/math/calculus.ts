type point = [number, number]
type Fn1D = (_: number) => number



// function sortByX(pts: point[]): point[] {
//     return [...pts].sort(([x1, y1], [x2, y2]) => x1 - x2)

// }


function intrapolateBetween([A, B]: [point, point], x: number): number {
    let [x1, y1] = A
    let [x2, y2] = B
    let r = (x - x1) / (x2 - x1)
    return y1 + (y2 - y1) * r
}



function intrapolate(sortedPts: point[], x: number): number {
    let first = sortedPts[0]
    let last = sortedPts.at(-1)!
    if (x < first[0]) return first[1]
    if (x > last[0]) return last[1]

    let j = sortedPts.findIndex(([X, Y]) => X > x)
    let i = j - 1
    return intrapolateBetween([sortedPts[i], sortedPts[j]], x)
}


export function functionize(sortedPts: point[]): Fn1D {
    // let sortedPts = sortByX(pts)
    return function (x: number): number {
        return intrapolate(sortedPts, x)
    }
}




export function differentiate(fn: Fn1D): Fn1D {
    return function (x: number): number {
        let dx = 0.000001
        let dy = fn(x + dx) - fn(x)
        return dy / dx
    }
}

export function integrate(fn: Fn1D, fixPoint = [0, 0]): Fn1D {
    let cache = [...fixPoint]
    return function (x: number): number {
        let dx = 0.001
        let [x0, y0] = cache
        if (x === x0) return y0

        let D = Math.abs(x - x0)
        let N = Math.round(D / dx)
        N = Math.max(N, 10)
        dx = (x - x0) / N

        for (let i = 0; i < N; i++) {
            let X = x0 + i * dx
            y0 += 0.5 * (fn(X) + fn(X + dx)) * dx
        }

        cache = [x, y0]
        return y0
    }
}
