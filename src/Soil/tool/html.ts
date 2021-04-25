/**
* @category Html
* @return get an array of all nodes of specified tag
* ```typescript
* let html = 'abc<ul><li>1</li><li>2</li><li>3</li></ul>'
* ExtractHTMLTag(html,'li') // ['1','2','3']
* ```
*/
export function ExtractHTMLTag(html: string, tag: string): string[] {
    let startTag = '<' + tag + '>'
    let endTag = '</' + tag + '>'
    let r = startTag + '[\\s\\S]*?' + endTag
    let nodes = html.match(new RegExp(r, 'g'))
    if (nodes === null) return []
    return nodes.map(x => x.replace(startTag, '').replace(endTag, ''))
}


/**
* @category Html
* @return append content to the end of a html tag
* ```typescript
* let html = 'abc<ul><li>1</li></ul>'
* AppendInHTMLTag(html, 'ul', '<li>2</li>') // 'abc<ul><li>1</li><li>2</li></ul>'
* ```
*/
export function AppendInHTMLTag(html: string, tag: string, content: string): string {
    let startTag = '<' + tag + '>'
    let endTag = '</' + tag + '>'
    return html.replace(endTag, content + endTag)
}


/**
* @category Html
* @return join items into html tags
* ```typescript
* let html = 'abc<ul><li>1</li></ul>'
* JoinToHTMLTag(['a','b'], 'li') // '<li>a</li><li>b</li>'
* ```
*/
export function JoinToHTMLTag(items: string[], tag: string): string {
    let startTag = '<' + tag + '>'
    let endTag = '</' + tag + '>'
    return items.map(n => startTag + n + endTag).join('')
}





/**
* @category Html
* @return print a variable (e.g. *x) into the html
* ```typescript
* let html = '1 + *x = *y'
* PrintVariable(html,'x',2) // '1 + 2 = *y'
* ```
*/
export function PrintVariable(html: string, symbol: string, value: any): string {
    let T = typeof value

    // print **x as sci notation
    if (T === 'number') {
        let v = Blur(Round(value, 3))
        if (v >= 10000 || v <= 0.01) {
            let sci = Sci(v)
            html = html.replace(new RegExp("\\*\\*" + symbol, 'g'), sci);
        } else {
            html = html.replace(new RegExp("\\*\\*" + symbol, 'g'), v);
        }
    }

    // print *%x as fraction
    if (T === 'number') {
        if (html.search("\\*\\/" + symbol) > -1) {
            let [p, q] = ToFrac(value)
            html = html.replace(new RegExp("\\*\\/" + symbol, 'g'), Dfrac(p, q));
        }
    }

    // print *x as normal
    if (T === 'number') {
        value = Blur(value)
        if (IsDecimal(value)) value = Round(value, 5)
    }
    if (T === 'boolean') {
        value = Tick(value)
    }
    html = html.replace(new RegExp("\\*" + symbol, 'g'), value);
    return html
}
