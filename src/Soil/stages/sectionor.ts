

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

function ExecSection(html: string, sections: section[]) {
    for (let i = 0; i < sections.length; i++) {
        let [section, version] = sections[i];
        html = KeepVersion(html, section.toString(), version);
    }
    html = DropTags(html);
    return html;
}



export function runSection(seed: Seed) {
    // execute the sectioning stage:
    // replace "##1.1, "##1.2", ... in seed.qn and seed.sol by according to seed.sections
    seed.qn = ExecSection(seed.qn, seed.config.sections);
    seed.sol = ExecSection(seed.sol, seed.config.sections);
}



