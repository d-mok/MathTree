import { exprCtxHTML } from '../eval';
function dropTags(html) {
    html = html.replaceAll(new RegExp('<[^#<]*##[^#>]*>', 'g'), '');
    return html;
}
function dropCondition(html, context) {
    return html.replaceAll(new RegExp('<p>##\{([^\{\}]*)\}<\\/p>((\\s|\\S)(?!##))*<p>##<\\/p>', 'g'), (match, p1) => exprCtxHTML(p1, context) ? match : "");
}
export function cropSection(html, context) {
    html = dropCondition(html, context);
    html = dropTags(html);
    return html;
}
//# sourceMappingURL=index.js.map