



function shuffle<T>(array: T[]): T[] {
    // pure helper function: shuffle array
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function distinct(array: any[]) {
    // check if array is distinct
    return (new Set(array)).size === array.length;
}


function randomOptions(correctAns: string): [number[], string] {
    // pure helper function: generate random array of [0,1,2,3] and ans (mapped from A)
    let ansIndex = ['A', 'B', 'C', 'D'].indexOf(correctAns);
    let arr = shuffle([0, 1, 2, 3]);
    let ans = ['A', 'B', 'C', 'D'][arr.indexOf(ansIndex)];
    return [arr, ans];
}

function rearrangeOptions(arr: string[], correctAns: string): [string[], string, number[]] {
    // pure helper function: arrange arr by this.randomOptions
    const [rndArr, ans] = randomOptions(correctAns);
    const rearrangedArr = rndArr.map(x => arr[x]);
    return [rearrangedArr, ans, rndArr];
}

function splitMC(html: string): [main: string, mc: string] {
    // pure helper function: split html into [beforeMC, MCOptions] two parts
    let arr = html.split('<ul>');
    if (arr.length <= 1) return [html, ""];
    let mc = arr.pop()!;
    mc = mc.replace('</ul>', '');
    let main = arr.join('<ul>')
    return [main, mc]
}

function splitOptions(mc: string): string[] {
    // pure helper function: split into MC options, [<li>...</li> , ... , ....]
    let m = mc.match(/<li>[\s\S]*?<\/li>/g);
    if (m === null) m = []
    return m
}

export function runShuffle(seed: Seed) {
    let [main, mc] = splitMC(seed.qn);
    let options = splitOptions(mc);
    if (options.length === 0) return;
    if (!distinct(options)) {
        seed.success = false
        seed.errName = "OptionDistinctError"
        seed.errMsg = "Options Duplicated"
        return
    }
    let [rearranged, ans, rndArr] = rearrangeOptions(options, seed.config.answer);
    seed.qn = main + '<ul>' + rearranged.join('') + '</ul>';
    seed.sol = "<p>Answer: " + ans + "</p><p><b>Solution:</b></p>" + seed.sol;
    let origArr = ['A', 'B', 'C', 'D'];
    for (let i = 0; i < 4; i++) {
        seed.sol = seed.sol.replace(new RegExp('\{\#' + origArr[rndArr[i]] + '\}', 'g'), origArr[i]);
    }
    seed.ans = ans;
}


