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
    let qnliTags = qn.between('<li>', '</li>')

    let hasDuplicatedOptions = !qnliTags
        .map($ => $.replaceAll(' ', ''))
        .isUniq()

    if (
        qnliTags.length === 0 ||
        qn.between('<ul>', '</ul>').length !== 1 ||
        sol.between('<ul>', '</ul>').length > 1 ||
        hasDuplicatedOptions
    ) {
        // blank <ul></ul> || no <ul></ul> || duplicated
        return {
            qn,
            sol,
            ans: 'X',
            hasDuplicatedOptions,
        }
    }

    let ansList = ['A', 'B', 'C', 'D', 'E', 'F'].take(qnliTags.length)

    let solliTags = [...sol.between('<li>', '</li>'), '', '', '', ''].take(
        qnliTags.length
    )

    let [qnHtmls, solHtmls, newAnsList] = shuffle
        ? qnliTags.coShuffled(solliTags, ansList)
        : [qnliTags.clone(), solliTags.clone(), ansList.clone()]
    let map = Object.fromEntries(newAnsList.zip(ansList))

    qn =
        qn.before('<ul>') +
        '<ul>' +
        qnHtmls.map($ => `<li>${$}</li>`).join('\n') +
        '</ul>' +
        qn.after('</ul>')

    if (sol.includes('<ul>')) {
        sol =
            sol.before('<ul>') +
            '<ul>' +
            solHtmls.map($ => `<li>${$}</li>`).join('\n') +
            '</ul>' +
            sol.after('</ul>')
    }

    ans = map[ans]
    sol = `<p>Answer: ${ans}</p><p><b>Solution:</b></p>${sol}`
    sol = sol.replaceAll(/{#([A-Z])}/g, (match, p1) => map[p1])
    sol = sol.replaceAll('{#answer}', ans)

    return {
        qn,
        sol,
        ans,
        hasDuplicatedOptions,
    }
}
