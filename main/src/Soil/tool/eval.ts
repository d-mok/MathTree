import { Dict, Config } from '../cls'
import { Stringifiers, pattern } from './stringify'
import { exprCtxHTML } from 'bot'





export function intrapolate(html: string, dict: Dict) {

    function intra(pattern: pattern, prefix: string) {
        html = html.replace(new RegExp(String.raw`\*${prefix}\\\{([^\{\}]*)\\\}`, 'g'),
            (match, code) => {
                let result = exprCtxHTML(code, dict)
                return Stringifiers.transform(pattern, result)
            })
        html = html.replace(new RegExp(String.raw`\*${prefix}\{([^\{\}]*)\}`, 'g'),
            (match, code) => {
                let result = exprCtxHTML(code, dict)
                return Stringifiers.transform(pattern, result)
            })
    }
    intra('*@', '')
    intra('*/@', '\\/')
    intra('**@', '\\*')
    return html
}


