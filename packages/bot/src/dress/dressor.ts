
const END_TAG = String.raw`(?=[^<>]*</span>)`
const SPACES = String.raw`(?:\s|&nbsp;)*`


export class Dressor {

    constructor(private html: string) { }

    do(reg: string[], replace: string, inTag: boolean = false) {
        let tail = inTag ? END_TAG : ''
        let regex = new RegExp(reg.join(SPACES) + tail, 'g')
        this.html = this.html.replace(regex, replace)
    }

    get(): string {
        return this.html
    }

}


