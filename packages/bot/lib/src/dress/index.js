import { Dressor } from './dressor';
function capOr(...reg) {
    return '(' + reg.join('|') + ')';
}
function cap(reg) {
    return '(' + reg + ')';
}
const s = String.raw `(?:\s|&nbsp;)*`;
const p = String.raw `\+`;
const m = String.raw `\-`;
const e = String.raw `(?:\=|\>|\<|&lt;|&gt;|\\ge|\\le|\\gt|\\lt)`;
const l = String.raw `[\(\[\{]`;
const r = String.raw `[\)\]\}]`;
const pl = String.raw `[\(\[]`;
const pr = String.raw `[\)\]]`;
const c = String.raw `\,`;
const v = String.raw `(?:[A-Za-z]|\\alpha|\\beta|\\theta|\\phi|\\pi|\\sigma|\\mu|α|β|θ|φ|μ|π|σ)`;
const f = String.raw `(?:\\sin|\\cos|\\tan|\\log|\\ln)`;
const sl = String.raw `\\`;
const left = String.raw `\\left`;
const sq = String.raw `\\sqrt`;
export function dress(html) {
    let d = new Dressor(html);
    // handle Signs
    d.do([p, m], '-');
    d.do([m, p], '-');
    d.do([capOr(l, e, c), m, m], '$1');
    d.do([m, m], '+');
    d.do([m, m], '+');
    // handle Power
    d.do([String.raw `\^\{1\}`], '');
    // handle Sqrt
    d.do([String.raw `\\sqrt\[2\]`], '\\sqrt');
    // handle Coeff
    d.do([capOr(p, m, e, l, sl, r, c), '1', capOr(v, f, pl, left, sq)], '$1 $2', true);
    // handle Prime
    d.do([cap(v) + "'"], '$1 \\prime ', true);
    return d.get();
}
// .replace(/(?<=<span class="math-tex">[^<>]*)([\+\-\=\(\[\{\\\)\]\}\,])(\s|&nbsp;)*1(\s|&nbsp;)*(?=[A-Za-z\(\[][^<>]*<\/span>)/g, '$1')
//# sourceMappingURL=index.js.map