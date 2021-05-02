define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExecSection = void 0;
    function DropVersion(html, section, version) {
        let id = section + '.' + version;
        return html.replace(new RegExp('<[^#<]*##' + id + '[^#]*##[^#>]*>', 'g'), '');
    }
    function DropTags(html) {
        html = html.replace(new RegExp('<[^#<]*##[^#>]*>', 'g'), '');
        return html;
    }
    function KeepVersion(html, section, version) {
        for (let i = 0; i < 10; i++) {
            if (i === version)
                continue;
            html = DropVersion(html, section, i);
        }
        return html;
    }
    function ExecSection(html, sections) {
        for (let i = 0; i < sections.length; i++) {
            let [section, version] = sections[i];
            html = KeepVersion(html, section.toString(), version);
        }
        html = DropTags(html);
        return html;
    }
    exports.ExecSection = ExecSection;
});
