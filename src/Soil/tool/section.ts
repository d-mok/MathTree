



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

export function ExecSection(html: string, sections: section[]) {
    for (let i = 0; i < sections.length; i++) {
        let [section, version] = sections[i];
        html = KeepVersion(html, section.toString(), version);
    }
    html = DropTags(html);
    return html;
}
