
function or(...reg: string[]): string {
    return '(' + reg.join('|') + ')'
}


// function inTag(input: string): string {
//     return input + String.raw``
// }

const s = String.raw`(?:\s|&nbsp;)*`
const p = String.raw`\+`
const m = String.raw`\-`
const e = String.raw`(?:\=|\>|\<|&lt;|&gt;|\\ge|\\le|\\gt|\\lt)`
const l = String.raw`[\(\[\{]`
const r = String.raw`[\)\]\}]`
const pl = String.raw`[\(\[]`
const pr = String.raw`[\)\]]`
const c = String.raw`\,`
const v = String.raw`(?:[A-Za-z]|\\alpha|\\beta|\\theta|\\phi|\\pi|\\sigma|\\mu|α|β|θ|φ|μ|π|σ)`
const f = String.raw`(?:\\sin|\\cos|\\tan|\\log|\\ln)`
const sl = String.raw`\\`
const left = String.raw`\\left`
const sq = String.raw`\\sqrt`

const endtag = String.raw`(?=[^<>]*</span>)`


function regReplace(input: string, reg: string, replace: string) {
    return input.replace(new RegExp(reg, 'g'), replace)
}



function handleSigns(input: string): string {
    input = regReplace(input, p + s + m, '-')
    input = regReplace(input, m + s + p, '-')
    input = regReplace(input, or(l, e, c) + s + m + s + m, '$1')
    input = regReplace(input, '(\,)' + s + m + s + m, '$1')
    input = regReplace(input, m + s + m, '+')
    input = regReplace(input, m + s + m, '+')
    return input
}

function handlePower(input: string): string {
    input = regReplace(input, String.raw`\^\{1\}`, '')
    return input
}


function handleSqrt(input: string): string {
    input = regReplace(input, String.raw`\\sqrt\[2\]`, '\\sqrt')
    return input
}

function handleCoeff(input: string): string {
    input = regReplace(input, or(p, m, e, l, sl, r, c) + s + 1 + s + or(v, f, pl, left, sq) + endtag, '$1 $2')
    return input
}

function handlePrime(input: string): string {
    input = regReplace(input, '(' + v + ')' + "'" + endtag, '$1 \\prime ')
    return input
}

export function dress(html: string): string {
    html = handleSigns(html)
    html = handlePower(html)
    html = handleSqrt(html)
    html = handleCoeff(html)
    html = handlePrime(html)
    return html
}



// .replace(/(?<=<span class="math-tex">[^<>]*)([\+\-\=\(\[\{\\\)\]\}\,])(\s|&nbsp;)*1(\s|&nbsp;)*(?=[A-Za-z\(\[][^<>]*<\/span>)/g, '$1')
