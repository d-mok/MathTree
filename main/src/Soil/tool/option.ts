import { QuestionHTML } from './html'

function produce(source: any, assigned: any): typeof source[] {
    return Array.isArray(assigned) && assigned !== source
        ? RndShuffle(...assigned)
        : RndShake(source)
}

function blankDicts<D>(count: number): D[] {
    let arr: D[] = []
    for (let i = 0; i < count; i++) arr.push({} as D)
    return arr
}

function execInstructions<D extends object>(
    instructions: Partial<D>,
    source: D
): Partial<D>[] {
    let dicts = blankDicts<D>(20)
    let k: keyof typeof instructions
    for (k in instructions) {
        let arr = produce(source[k], instructions[k])
        arr.forEach((v, i) => (dicts[i][k] = v))
    }
    return dicts
}

export function AutoOptions<D extends object>(
    instructions: Partial<D>,
    question: string,
    source: D
): string {
    if (owl.emptyObject(instructions)) return question
    let Qn = new QuestionHTML(question)
    let dicts = execInstructions(instructions, source)

    if (Qn.liCount() === 1) {
        Qn.cloneLi(0, 3)
        Qn.printInLi(1, dicts[0])
        Qn.printInLi(2, dicts[1])
        Qn.printInLi(3, dicts[2])
        return Qn.export()
    }

    if (Qn.liCount() === 2) {
        Qn.cloneLi(0)
        Qn.cloneLi(1)
        Qn.printInLi(2, dicts[0])
        Qn.printInLi(3, dicts[0])
        return Qn.export()
    }
    return question
}
