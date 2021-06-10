
import { Dict } from '../cls'
import { evalInline } from './eval'

function DropVersion(html: string, section: string, version: number) {
    let id = section + '.' + version;
    return html.replace(new RegExp('<p>##' + id + '<\\/p>((\\s|\\S)(?!##))*<p>##<\\/p>', 'g'), '');
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
        new RegExp('<p>##\{([^\{\}]*)\}<\\/p>((\\s|\\S)(?!##))*<p>##<\\/p>', 'g'),
        (match, p1) => evalInline(p1, dict) ? match : ""
    );
}
