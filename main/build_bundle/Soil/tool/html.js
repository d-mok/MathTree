import { blacksmith } from './blacksmith.js';
import { HTMLWorker } from 'bot';
export class QuestionHTML extends HTMLWorker {
    // assume a structure '...<ul><li>...</li><li>...</li><li>...</li></ul>'
    // there must be no ul or li tags except the answer options
    hasOneUl() {
        return this.all('ul').length === 1;
    }
    liCount() {
        return this.all('li').length;
    }
    getLiHTMLs() {
        return this.all('li').map($ => $.innerHTML);
    }
    setLiHTMLs(htmls) {
        for (let i = 0; i < this.liCount(); i++) {
            this.all('li')[i].innerHTML = htmls[i];
        }
    }
    cloneLi(sourceIndex, repeat = 1) {
        for (let i = 1; i <= repeat; i++) {
            let clone = this.clone('li', sourceIndex);
            this.one('ul').appendChild(clone);
        }
    }
    printInLi(index, dict) {
        this.tranformInnerHTML(html => {
            html = blacksmith.intra(html, dict);
            html = blacksmith.forge(html, dict);
            return html;
        }, 'li', index);
    }
    isLiDuplicated() {
        return this.hasDuplicate('li');
    }
}
