import _ from 'lodash'

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
    let liTags = qn.between('<li>', '</li>')

    let hasDuplicatedOptions = !liTags.map($ => $.replaceAll(' ', '')).isUniq()

    if (
        liTags.length === 0 ||
        qn.between('<ul>', '</ul>').length !== 1 ||
        hasDuplicatedOptions
    ) {
        // blank <ul></ul> || no <ul></ul> || duplicated
        ans = 'X'
    } else {
        let htmls = [...liTags]
        let ansList = ['A', 'B', 'C', 'D', 'E', 'F'].take(htmls.length)
        let [newHtmls, newAnsList] = shuffle
            ? htmls.coShuffled(ansList)
            : [htmls.clone(), ansList.clone()]
        let map = Object.fromEntries(newAnsList.zip(ansList))

        qn =
            qn.before('<ul>') +
            '<ul>' +
            newHtmls.map($ => `<li>${$}</li>`).join('\n') +
            '</ul>' +
            qn.after('</ul>')

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
