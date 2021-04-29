import { QuestionHTML } from './html';
function Produce(source, assigned) {
    return Array.isArray(assigned) && assigned !== source
        ? RndShuffle(...assigned)
        : RndShake(source);
}
function ExecInstructions(instructions, source) {
    let products = {};
    let k;
    for (k in instructions) {
        products[k] = Produce(source[k], instructions[k]);
    }
    return products;
}
/**
* append the array of options to question
* ```typescript
* let question = 'abc<ul><li>*x</li></ul>'
* AutoOptions(question,{x:3})
* // 'abc<ul><li>*x</li><li>2</li><li>4</li><li>5</li></ul>'
* ```
*/
export function AutoOptions(instructions, question, source) {
    if (IsEmptyObject(instructions))
        return question;
    let Qn = new QuestionHTML(question);
    let products = ExecInstructions(instructions, source);
    if (Qn.li.length === 1) {
        Qn.cloneLi(0, 3);
        for (let k in products) {
            Qn.printInLi(1, k, products[k][0]);
            Qn.printInLi(2, k, products[k][1]);
            Qn.printInLi(3, k, products[k][2]);
        }
        return Qn.export();
    }
    if (Qn.li.length === 2) {
        Qn.cloneLi(0);
        Qn.cloneLi(1);
        for (let k in products) {
            Qn.printInLi(2, k, products[k][0]);
            Qn.printInLi(3, k, products[k][0]);
        }
        return Qn.export();
    }
    return question;
}
