import { Dict, Config, SeedCore } from '../cls'
import { AppendInHTMLTag, ExtractHTMLTag, JoinToHTMLTag, PrintVariable } from './html'

import { QuestionHTML } from './html/index'

type Product = {
    [_: string]: any[]
}



function ExecInstructions(instructions: Partial<Dict>, source: Dict): Product {
    function Produce(source: any, assigned: any[]) {
        let product = []
        if (IsArray(assigned)) {
            product = Clone(assigned)
            product = RndShuffle(...product)
        } else {
            try {
                product.push(...RndShake(source))
            } catch {
            }
        }
        return product
    }

    let products: Product = {}
    let k: keyof Partial<Dict>
    for (k in instructions) {
        products[k] = Produce(source[k], instructions[k])
    }
    return products
}


/**
* @category AutoOptions
* @return append the array of options to question
* ```typescript
* let question = 'abc<ul><li>*x</li></ul>'
* AutoOptions(question,{x:3}) 
* // 'abc<ul><li>*x</li><li>2</li><li>4</li><li>5</li></ul>'
* ```
*/
export function AutoOptions2(instructions: Partial<Dict>, question: string, source: Dict): string {
    if (IsEmptyObject(instructions)) return question
    let options = ExtractHTMLTag(question, 'li')
    let products = ExecInstructions(instructions, source)

    if (options.length === 1) {
        let others = [options[0], options[0], options[0]]
        for (let k in products) {
            for (let i = 0; i < 3; i++) {
                others[i] = PrintVariable(others[i], k, products[k][i])
            }
        }
        return AppendInHTMLTag(question, 'ul', JoinToHTMLTag(others, 'li'))
    }

    if (options.length === 2) {
        let others = [options[0], options[1]]
        for (let k in products) {
            others[0] = PrintVariable(others[0], k, products[k][0])
            others[1] = PrintVariable(others[1], k, products[k][0])
        }
        return AppendInHTMLTag(question, 'ul', JoinToHTMLTag(others, 'li'))
    }

    return question
}



export function AutoOptions(instructions: Partial<Dict>, question: string, source: Dict): string {
    let Qn = new QuestionHTML(question)
    if (IsEmptyObject(instructions)) return question
    // let options = ExtractHTMLTag(Qn, 'li')
    let products = ExecInstructions(instructions, source)

    if (Qn.li.length === 1) {
        Qn.cloneLi(0, 3)
        // let others = [options[0], options[0], options[0]]
        for (let k in products) {
            for (let i = 0; i <= 2; i++) {
                // console.log(Qn.li[i].innerHTML)
                Qn.printInLi(i + 1, k, products[k][i])
                // others[i] = PrintVariable(others[i], k, products[k][i])
            }
        }
        // return AppendInHTMLTag(question, 'ul', JoinToHTMLTag(others, 'li'))
    }

    if (Qn.li.length === 2) {
        Qn.cloneLi(0)
        Qn.cloneLi(1)
        // let others = [options[0], options[1]]
        for (let k in products) {
            Qn.printInLi(2, k, products[k][0])
            Qn.printInLi(3, k, products[k][0])
            // others[0] = PrintVariable(others[0], k, products[k][0])
            // others[1] = PrintVariable(others[1], k, products[k][0])
        }
        // return AppendInHTMLTag(question, 'ul', JoinToHTMLTag(others, 'li'))
    }

    // return question
    return Qn.export()
}
