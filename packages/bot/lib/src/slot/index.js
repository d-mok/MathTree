function dropTags(html) {
    html = html.replaceAll(new RegExp('<[^#<]*##[^#>]*>', 'g'), '');
    return html;
}
function getSlots(html) {
    let matches = html.matchAll(new RegExp('<p>##([\\w]+)<\\/p>((\\s|\\S)(?!##))*<p>##<\\/p>', 'g'));
    let slots = {};
    for (let [content, key] of matches) {
        slots[key] = dropTags(content);
    }
    return slots;
}
function injectSlots(html, slots) {
    return html.replaceAll(/<p>##([\w]+)<\/p>/g, (match, p1) => slots[p1]);
}
export function mergeSlots(sourceHtml, targetHtml) {
    let slots = getSlots(sourceHtml);
    targetHtml = injectSlots(targetHtml, slots);
    return targetHtml;
}
//# sourceMappingURL=index.js.map