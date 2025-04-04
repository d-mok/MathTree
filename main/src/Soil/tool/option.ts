// import { QuestionHTML } from './html.js'
import { dice } from 'fate'
import _ from 'lodash'
import { blacksmith } from './blacksmith.js'

function produce<S>(source: S, assigned: S | S[] | ((_: S) => S)): S[] {
    if (assigned === source) {
        return RndShake(source)
    }
    if (_.isFunction(assigned)) {
        let f = () => assigned(source)
        return dice(f).forbid(source).unique().rolls(3)
    }
    if (Array.isArray(assigned)) {
        if (assigned.length === 1) {
            let fake = assigned[0]
            return [source, fake, fake].shuffled()
        }
        if (assigned.length === 2) {
            return [source, ...assigned, ...assigned].shuffled()
        }
        return assigned.shuffled()
    }
    return RndShake(source)
}

type dict = Record<string, any>

export function AutoOptions(
    instructions: dict,
    question: string,
    source: dict
): string {
    if (Object.keys(instructions).length === 0) return question
    // let Qn = new QuestionHTML(question)
    let liTags = question.between('<li>', '</li>')

    let patches = _.mapValues(instructions, (v, k) => produce(source[k], v))
    let dicts = (i: number) => _.mapValues(patches, $ => $[i])

    if (liTags.length === 1) {
        liTags.push(liTags[0], liTags[0], liTags[0])
        // Qn.cloneLi(0, 3)
        liTags[1] = transformHTML(liTags[1], { ...source, ...dicts(0) })
        liTags[2] = transformHTML(liTags[2], { ...source, ...dicts(1) })
        liTags[3] = transformHTML(liTags[3], { ...source, ...dicts(2) })
        // Qn.printInLi(1, { ...source, ...dicts(0) })
        // Qn.printInLi(2, { ...source, ...dicts(1) })
        // Qn.printInLi(3, { ...source, ...dicts(2) })
        return (
            question.before('<ul>') +
            '<ul>' +
            liTags.map($ => `<li>${$}</li>`).join('\n') +
            '</ul>' +
            question.after('</ul>')
        )
        // return Qn.export()
    }

    if (liTags.length === 2) {
        liTags.push(liTags[0], liTags[1])
        // Qn.cloneLi(0)
        // Qn.cloneLi(1)
        liTags[2] = transformHTML(liTags[2], { ...source, ...dicts(0) })
        liTags[3] = transformHTML(liTags[3], { ...source, ...dicts(0) })
        // Qn.printInLi(2, { ...source, ...dicts(0) })
        // Qn.printInLi(3, { ...source, ...dicts(0) })
        return (
            question.before('<ul>') +
            '<ul>' +
            liTags.map($ => `<li>${$}</li>`).join('\n') +
            '</ul>' +
            question.after('</ul>')
        )
        // return Qn.export()
    }
    return question
}

function transformHTML(html: string, dict: object): string {
    html = blacksmith.intra(html, dict)
    html = blacksmith.forge(html, dict)
    return html
}
