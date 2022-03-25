import { PlainDict } from '../cls'
import { QuestionHTML } from './html'

function Produce(source: any, assigned: any): (typeof source)[] {
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


function ExecInstructions(instructions: Partial<PlainDict>, source: PlainDict): Partial<PlainDict>[] {
    let dicts = blankDicts(20)
    let k: keyof PlainDict
    for (k in instructions) {
        let arr = Produce(source[k], instructions[k])
        arr.forEach((v, i) => dicts[i][k] = v)
        // products[k] = Produce(source[k], instructions[k])
    }
    return dicts
}


/**
* append the array of options to question
* ```typescript
* let question = 'abc<ul><li>*x</li></ul>'
* AutoOptions(question,{x:3})
* // 'abc<ul><li>*x</li><li>2</li><li>4</li><li>5</li></ul>'
* ```
*/
export function AutoOptions(instructions: Partial<PlainDict>, question: string, source: PlainDict): string {
    if (owl.emptyObject(instructions)) return question
    let Qn = new QuestionHTML(question)
    let dicts = ExecInstructions(instructions, source)

    if (Qn.liCount() === 1) {
        Qn.cloneLi(0, 3)
        Qn.printInLi(1, dicts[0])
        Qn.printInLi(2, dicts[1])
        Qn.printInLi(3, dicts[2])


        // for (let k in products) {
        //     Qn.printInLi(1, k, products[k as keyof PlainDict][0])
        //     Qn.printInLi(2, k, products[k as keyof PlainDict][1])
        //     Qn.printInLi(3, k, products[k as keyof PlainDict][2])
        // }
        return Qn.export()
    }

    if (Qn.liCount() === 2) {
        Qn.cloneLi(0)
        Qn.cloneLi(1)
        Qn.printInLi(2, dicts[0])
        Qn.printInLi(3, dicts[0])

        // for (let k in products) {
        //     Qn.printInLi(2, k, products[k as keyof PlainDict][0])
        //     Qn.printInLi(3, k, products[k as keyof PlainDict][0])
        // }
        return Qn.export()
    }
    return question
}
