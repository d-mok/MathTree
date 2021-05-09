
import { Dict, Config } from '../cls'


function DropVersion(html: string, section: string, version: number) {
    let id = section + '.' + version;
    return html.replace(new RegExp('<[^#<]*##' + id + '[^#]*##[^#>]*>', 'g'), '');
}


function DropTags(html: string) {
    html = html.replace(new RegExp('<[^#<]*##[^#>]*>', 'g'), '');
    return html;
}

function KeepVersion(html: string, section: string, version: number) {
    for (let i = 0; i < 10; i++) {
        if (i === version) continue;
        html = DropVersion(html, section, i);
    }
    return html;
}

export function ExecSection(html: string, sections: section[], dict: Dict) {
    for (let i = 0; i < sections.length; i++) {
        let [section, version] = sections[i];
        html = KeepVersion(html, section.toString(), version);
    }
    html = DropCondition(html, dict)
    html = DropTags(html);
    return html;
}




function DropCondition(html: string, dict: Dict): string {
    return html.replace(
        new RegExp('<[^#<]*##\{([^\{\}]*)\}[^#]*##[^#>]*>', 'g'),
        (match: string, p1: string) => {
            let {
                a, b, c, d, e, f, g, h, i, j, k, l, m, n,
                o, p, q, r, s, t, u, v, w, x, y, z,
                A, B, C, D, E, F, G, H, I, J, K, L, M, N,
                O, P, Q, R, S, T, U, V, W, X, Y, Z
            } = dict;
            let result: boolean
            try {
                result = eval(p1)
            } catch (e) {
                if (e.message === 'Cannot convert a Symbol value to a number') {
                    throw CustomError(
                        'VariableError',
                        "A variable is used before a value is given."
                    )
                } else {
                    throw e
                }
            }
            return result ? match : ""
        });
}
