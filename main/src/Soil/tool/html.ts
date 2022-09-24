import { blacksmith } from './blacksmith'
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

    cloneLi(sourceIndex: number, repeat = 1) {
        for (let i = 1; i <= repeat; i++) {
            let clone = this.clone('li', sourceIndex)
            this.one('ul').appendChild(clone)
        }
    }

    printInLi(index: number, dict: object) {
        this.tranformInnerHTML(
            html => {
                html = blacksmith.forge(html, dict)
                html = blacksmith.intra(html, dict)
                return html
            },
            'li',
            index
        )
    }

    isLiDuplicated(): boolean {
        return this.hasDuplicate('li')
    }

    shuffleLi(indexArr: number[]) {
        this.shuffleChildren(indexArr, 'ul')
    }
}
