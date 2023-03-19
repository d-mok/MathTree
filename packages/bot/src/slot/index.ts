// function dropTags(html: string) {
//     html = html.replaceAll(new RegExp('<[^#<]*##[^#>]*>', 'g'), '')
//     return html
// }

// function getSlots(html: string): Record<string, string> {
//     let matches = html.matchAll(
//         new RegExp('<p>##([\\w]+)<\\/p>((\\s|\\S)(?!##))*<p>##<\\/p>', 'g')
//     )
//     let slots: Record<string, string> = {}
//     for (let [content, key] of matches) {
//         slots[key] = dropTags(content)
//     }
//     return slots
// }

// function injectSlots(html: string, slots: Record<string, string>) {
//     return html.replaceAll(
//         /<p>##([\w]+)<\/p>/g,
//         (match, p1) => slots[p1] ?? `## slot ${p1} not found!`
//     )
// }

// export function mergeSlots(sourceHtml: string, targetHtml: string) {
//     let slots = getSlots(sourceHtml)
//     targetHtml = injectSlots(targetHtml, slots)
//     return targetHtml
// }
