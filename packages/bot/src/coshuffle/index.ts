

function shuffledArray<T>(arr: T[]): T[] {
    let a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]
    }
    return a
}


export function shuffleIndex(count: number, shuffle = true): number[] {
    let nums = [...Array(count).keys()]
    return shuffle ? shuffledArray(nums) : nums
}


export function shuffleAs<T>(arr: T[], indexArr: number[]): T[] {
    if (arr.length !== indexArr.length)
        throw 'ShuffleAs arr.length not equal to indexArr.length!'
    let newArr = Array(arr.length).fill(undefined)
    for (let i = 0; i < arr.length; i++) {
        const j = indexArr[i]
        newArr[i] = arr[j]
    }
    return newArr
}
