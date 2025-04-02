import { QuestionHTML } from './html.js'
import _ from 'lodash'

function coshuffle<T1, T2>(
    arr1: T1[],
    arr2: T2[],
    shuffle: boolean
): [T1[], T2[]] {
    if (!shuffle) return [arr1, arr2]
    let zipped = arr1.zip(arr2).shuffled()
    return [zipped.map($ => $[0]), zipped.map($ => $[1])]
}

export function shuffleOptions(
    qn: string,
    sol: string,
    ans: string,
    shuffle: boolean
): {
    qn: string
    sol: string
    ans: string
    hasDuplicatedOptions: boolean
} {
    let Qn = new QuestionHTML(qn)
    let hasDuplicatedOptions = Qn.isLiDuplicated()

    if (Qn.liCount() === 0 || !Qn.hasOneUl() || hasDuplicatedOptions) {
        // blank <ul></ul> || no <ul></ul> || duplicated
        ans = 'X'
    } else {
        let htmls = Qn.getLiHTMLs()
        let ansList = _.take(['A', 'B', 'C', 'D', 'E', 'F'], htmls.length)
        let [newHtmls, newAnsList] = coshuffle(htmls, ansList, shuffle)
        let map = _.zipObject(newAnsList, ansList)

        Qn.setLiHTMLs(newHtmls)
        qn = Qn.export()
        ans = map[ans]
        sol = `<p>Answer: ${ans}</p><p><b>Solution:</b></p>${sol}`.replaceAll(
            /{#([A-Z])}/g,
            (match, p1) => map[p1]
        )
    }

    return {
        qn,
        sol,
        ans,
        hasDuplicatedOptions,
    }
}
