import { QuestionHTML } from './html.js';
function coshuffle(arr1, arr2, shuffle) {
    if (!shuffle)
        return [arr1, arr2];
    let zipped = arr1.zip(arr2).shuffled();
    return [zipped.map($ => $[0]), zipped.map($ => $[1])];
}
export function shuffleOptions(qn, sol, ans, shuffle) {
    let Qn = new QuestionHTML(qn);
    let hasDuplicatedOptions = Qn.isLiDuplicated();
    if (Qn.liCount() === 0 || !Qn.hasOneUl() || hasDuplicatedOptions) {
        // blank <ul></ul> || no <ul></ul> || duplicated
        ans = 'X';
    }
    else {
        let htmls = Qn.getLiHTMLs();
        let ansList = ['A', 'B', 'C', 'D', 'E', 'F'].slice(0, htmls.length);
        let [newHtmls, newAnsList] = coshuffle(htmls, ansList, shuffle);
        let map = Object.fromEntries(newAnsList.zip(ansList));
        Qn.setLiHTMLs(newHtmls);
        qn = Qn.export();
        ans = map[ans];
        sol = `<p>Answer: ${ans}</p><p><b>Solution:</b></p>${sol}`.replaceAll(/{#([A-Z])}/g, (match, p1) => map[p1]);
    }
    return {
        qn,
        sol,
        ans,
        hasDuplicatedOptions,
    };
}
