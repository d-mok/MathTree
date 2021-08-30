import { Dict } from '../cls'
import { QuestionHTML } from './html'


function deepEqual(a: any, b: any): boolean {
    return JSON.stringify(a) === JSON.stringify(b)
}


function Produce(source: any, assigned: any): (typeof source)[] {
    return Array.isArray(assigned) && assigned !== source
        ? RndShuffle(...assigned.filter($ => !deepEqual($, source)))
        : RndShake(source)
}

function ExecInstructions(instructions: Partial<Dict>, source: Dict): Partial<Dict> {
    let products: Partial<Dict> = {}
    let k: keyof Dict
    for (k in instructions) {
        products[k] = Produce(source[k], instructions[k])
    }
    return products
}


/**
* append the array of options to question
* ```typescript
* let question = 'abc<ul><li>*x</li></ul>'
* AutoOptions(question,{x:3}) 
* // 'abc<ul><li>*x</li><li>2</li><li>4</li><li>5</li></ul>'
* ```
*/
export function AutoOptions(instructions: Partial<Dict>, question: string, source: Dict): string {
    if (owl.emptyObject(instructions)) return question
    let Qn = new QuestionHTML(question)
    let products = ExecInstructions(instructions, source)

    if (Qn.li.length === 1) {
        Qn.cloneLi(0, 3)
        for (let k in products) {
            Qn.printInLi(1, k, products[k as keyof Dict][0])
            Qn.printInLi(2, k, products[k as keyof Dict][1])
            Qn.printInLi(3, k, products[k as keyof Dict][2])
        }
        return Qn.export()
    }

    if (Qn.li.length === 2) {
        Qn.cloneLi(0)
        Qn.cloneLi(1)
        for (let k in products) {
            Qn.printInLi(2, k, products[k as keyof Dict][0])
            Qn.printInLi(3, k, products[k as keyof Dict][0])
        }
        return Qn.export()
    }
    return question
}
