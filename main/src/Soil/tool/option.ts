import { QuestionHTML } from './html'
import { dice } from 'fate'
import _ from 'lodash'

function produce<S>(source: S, assigned: S | S[] | ((_: S) => S)): S[] {
    if (assigned === source) {
        return RndShake(source)
    }
    if (_.isFunction(assigned)) {
        let f = () => assigned(source)
        return dice(f).forbid(source).unique().rolls(3)
    }
    if (Array.isArray(assigned)) {
        return _.shuffle(assigned)
    }
    return RndShake(source)
}

type dict = Record<string, any>

export function AutoOptions(
    instructions: dict,
    question: string,
    source: dict
): string {
    if (owl.emptyObject(instructions)) return question
    let Qn = new QuestionHTML(question)

    let patches = _.mapValues(instructions, (v, k) => produce(source[k], v))
    let dicts = (i: number) => _.mapValues(patches, $ => $[i])

    if (Qn.liCount() === 1) {
        Qn.cloneLi(0, 3)
        Qn.printInLi(1, { ...source, ...dicts(0) })
        Qn.printInLi(2, { ...source, ...dicts(1) })
        Qn.printInLi(3, { ...source, ...dicts(2) })
        return Qn.export()
    }

    if (Qn.liCount() === 2) {
        Qn.cloneLi(0)
        Qn.cloneLi(1)
        Qn.printInLi(2, { ...source, ...dicts(0) })
        Qn.printInLi(3, { ...source, ...dicts(0) })
        return Qn.export()
    }
    return question
}
