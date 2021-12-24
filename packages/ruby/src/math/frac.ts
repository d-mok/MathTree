type frac = [number, number]


function val(f: frac): number {
    let [a, b] = f
    return a / b
}

function nextTerm(f2: frac, f1: frac, a: number): frac {
    let [h1, k1] = f1
    let [h2, k2] = f2
    return [h2 + a * h1, k2 + a * k1]
}

function getCloser(x: number, f1: frac, f2: frac): frac {
    let a = Math.abs(val(f1) - x)
    let b = Math.abs(val(f2) - x)
    return a > b ? f2 : f1
}



export function convergent(num: number, maxD: number): frac {
    let sign = Math.sign(num)
    num = Math.abs(num)

    let x = num
    let a: number
    let f2: frac = [0, 1]
    let f1: frac = [1, 0]
    let f: frac

    while (true) {
        a = Math.floor(x)
        f = nextTerm(f2, f1, a)
        if (f[1] > maxD) break

        x = 1 / (x - a)
        x = Math.abs(x)
        f2 = f1
        f1 = f
    }

    let [p, q] = getCloser(num, f1, f2)
    return [sign * p, q]
}