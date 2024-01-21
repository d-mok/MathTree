import { exprCtxHTML } from '../eval/index.js';
function dropTags(html) {
    html = html.replaceAll(new RegExp('<[^#<]*##[^#>]*>', 'g'), '');
    return html;
}
export function loopSection(html, context) {
    return html.replaceAll(new RegExp('<p>##\\[([\\w]+),([^,\\[\\]]+),([^,\\[\\]]+)\\]<\\/p>((\\s|\\S)(?!##))*<p>##<\\/p>', 'g'), (match, index, start, end) => {
        let s = exprCtxHTML(start, context);
        let e = exprCtxHTML(end, context);
        let T = '';
        for (let i = s; i <= e; i++) {
            T += dropTags(match).replaceAll(index, String(i));
        }
        return T;
    });
}
//# sourceMappingURL=index.js.map