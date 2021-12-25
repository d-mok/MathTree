type point = [number, number]
type Fn1D = (_: number) => number



function sortByX(pts: point[]): point[] {
    return [...pts].sort(([x1, y1], [x2, y2]) => x1 - x2)

}


function intrapolateBetween([A, B]: [point, point], x: number): number {
    let [x1, y1] = A
    let [x2, y2] = B
    let r = (x - x1) / (x2 - x1)
    return y1 + (y2 - y1) * r
}

// function justOnLeft(sortedPts: point[], x: number): point | undefined {
//     return sortedPts.filter(([x0, _]) => x0 <= x).at(-1)
// }


// function justOnRight(sortedPts: point[], x: number): point | undefined {
//     return sortedPts.filter(([x0, _]) => x0 >= x)[0]
// }



function intrapolate(sortedPts: point[], x: number): number {
    let first = sortedPts[0]
    let last = sortedPts.at(-1)!
    if (x < first[0]) return first[1]
    if (x > last[0]) return last[1]

    let j = sortedPts.findIndex(([X, Y]) => X > x)
    let i = j - 1
    return intrapolateBetween([sortedPts[i], sortedPts[j]], x)
}


function makeFn(pts: point[]): Fn1D {
    let sortedPts = sortByX(pts)
    return function (x: number): number {
        return intrapolate(sortedPts, x)
    }
}




export function differentiate(fn: Fn1D): Fn1D {
    return function (x: number): number {
        let dx = 0.00001
        let dy = fn(x + dx) - fn(x)
        return dy / dx
    }
}

export function integrate(fn: Fn1D, lowerLimit: number, dx = 0.001): Fn1D {
    let cache: point
    let cached = false
    return function (x: number): number {
        let [x0, y0] = cached ? cache : [lowerLimit, 0]
        if (x >= x0) {
            for (let X = x0; X < x; X += dx) {
                y0 += 0.5 * (fn(X) + fn(X + dx)) * dx
            }
        } else {
            for (let X = x0; X > x; X -= dx) {
                y0 -= 0.5 * (fn(X) + fn(X + dx)) * dx
            }
        }
        cache = [x, y0]
        cached = true
        return y0
    }
}
