import { PlainDict } from '../cls'
import { QuestionHTML } from './html'

function produce(source: any, assigned: any): (typeof source)[] {
    return Array.isArray(assigned) && assigned !== source
        ? RndShuffle(...assigned)
        : RndShake(source)
}

function blankDicts(count: number): Partial<PlainDict>[] {
    let arr: Partial<PlainDict>[] = []
    for (let i = 0; i < count; i++)
        arr.push({})
    return arr
}


function execInstructions(instructions: Partial<PlainDict>, source: PlainDict): Partial<PlainDict>[] {
    let dicts = blankDicts(20)
    let k: keyof PlainDict
    for (k in instructions) {
        let arr = produce(source[k], instructions[k])
        arr.forEach((v, i) => dicts[i][k] = v)
    }
    return dicts
}


export function AutoOptions(instructions: Partial<PlainDict>, question: string, source: PlainDict): string {
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
