import { blacksmith } from './blacksmith.js'
import { HTMLWorker } from 'bot'

export class QuestionHTML extends HTMLWorker {
    // assume a structure '...<ul><li>...</li><li>...</li><li>...</li></ul>'
    // there must be no ul or li tags except the answer options

    hasOneUl(): boolean {
        return this.all('ul').length === 1
    }

    liCount(): number {
        return this.all('li').length
    }

    getLiHTMLs(): string[] {
        return this.all('li').map($ => $.innerHTML)
    }

    setLiHTMLs(htmls: string[]): void {
        for (let i = 0; i < this.liCount(); i++) {
            this.all('li')[i].innerHTML = htmls[i]
        }
    }

    cloneLi(sourceIndex: number, repeat = 1) {
        for (let i = 1; i <= repeat; i++) {
            let clone = this.clone('li', sourceIndex)
            this.one('ul').appendChild(clone)
        }
    }

    printInLi(index: number, dict: object) {
        this.tranformInnerHTML(
            html => {
                html = blacksmith.intra(html, dict)
                html = blacksmith.forge(html, dict)
                return html
            },
            'li',
            index
        )
    }

    isLiDuplicated(): boolean {
        return this.hasDuplicate('li')
    }

    // shuffleLi(indexArr: number[]) {
    //     this.shuffleChildren(indexArr, 'ul')
    // }
}
