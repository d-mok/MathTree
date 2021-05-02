define(["require", "exports", "./html"], function (require, exports, html_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OptionShuffler = void 0;
    class OptionShuffler {
        constructor(qn, sol, ans) {
            this.qn = qn;
            this.sol = sol;
            this.ans = ans;
            this.perm = [];
            this.valid = false;
            this.Qn = new html_1.QuestionHTML(qn);
            if (!this.Qn.ul)
                return; // no <ul></ul>
            if (this.Qn.li.length === 0)
                return; // blank <ul></ul>
            this.valid = true;
        }
        AreOptionsDuplicated() {
            return this.Qn.isLiDuplicated();
        }
        genQn() {
            if (!this.valid)
                return this.qn;
            this.perm = this.Qn.shuffleLi();
            return this.Qn.export();
        }
        mapLetter(oldLetter) {
            let oldIndex = ['A', 'B', 'C', 'D', 'E', 'F'].indexOf(oldLetter);
            let newIndex = this.perm[oldIndex];
            return ['A', 'B', 'C', 'D', 'E', 'F'][newIndex];
        }
        genAns() {
            if (!this.valid)
                return "X";
            return this.mapLetter(this.ans);
        }
        genSol() {
            if (!this.valid)
                return this.sol;
            let newSol = "<p>Answer: "
                + this.genAns()
                + "</p><p><b>Solution:</b></p>"
                + this.sol;
            let ansList = ['A', 'B', 'C', 'D', 'E', 'F'];
            ansList.length = this.perm.length;
            for (let x of ansList) {
                newSol = newSol.replace(new RegExp('\{\#' + x + '\}', 'g'), this.mapLetter(x));
            }
            return newSol;
        }
    }
    exports.OptionShuffler = OptionShuffler;
});
