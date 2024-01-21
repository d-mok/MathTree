import { exprCtxHTML } from '../eval/index.js'

function dropTags(html: string) {
    html = html.replaceAll(new RegExp('<[^#<]*##[^#>]*>', 'g'), '')
    return html
}

function dropCondition(html: string, context: object): string {
    return html.replaceAll(
        new RegExp('<p>##{([^{}]*)}<\\/p>((\\s|\\S)(?!##))*<p>##<\\/p>', 'g'),
        (match, p1) => (exprCtxHTML(p1, context) ? match : '')
    )
}

export function cropSection(html: string, context: object) {
    html = dropCondition(html, context)
    html = dropTags(html)
    return html
}
