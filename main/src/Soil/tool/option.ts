import { dice } from 'fate'
import { blacksmith } from './blacksmith.js'

function isFunction(obj: unknown): obj is Function {
    return typeof obj === 'function'
}

function produce<S>(source: S, assigned: S | S[] | (($: S) => S)): S[] {
    if (assigned === source) {
        return RndShake(source)
    }
    if (isFunction(assigned)) {
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
    qn: string,
    source: dict
): string {
    if (Object.keys(instructions).length === 0) return qn
    let liTags = qn.between('<li>', '</li>')

    let patches = Object.mapValues(instructions, (v, k) =>
        produce(source[k], v)
    )
    let dicts = (i: number) => Object.mapValues(patches, $ => $[i])

    if (liTags.length === 1) {
        liTags.push(liTags[0], liTags[0], liTags[0])
        liTags[1] = transformHTML(liTags[1], { ...source, ...dicts(0) })
        liTags[2] = transformHTML(liTags[2], { ...source, ...dicts(1) })
        liTags[3] = transformHTML(liTags[3], { ...source, ...dicts(2) })
        return (
            qn.before('<ul>') +
            '<ul>' +
            liTags.map($ => `<li>${$}</li>`).join('\n') +
            '</ul>' +
            qn.after('</ul>')
        )
    }

    if (liTags.length === 2) {
        liTags.push(liTags[0], liTags[1])
        liTags[2] = transformHTML(liTags[2], { ...source, ...dicts(0) })
        liTags[3] = transformHTML(liTags[3], { ...source, ...dicts(0) })
        return (
            qn.before('<ul>') +
            '<ul>' +
            liTags.map($ => `<li>${$}</li>`).join('\n') +
            '</ul>' +
            qn.after('</ul>')
        )
    }
    return qn
}

function transformHTML(html: string, dict: object): string {
    html = blacksmith.intra(html, dict)
    html = blacksmith.forge(html, dict)
    return html
}
