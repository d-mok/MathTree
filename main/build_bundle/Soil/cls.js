export class Config {
    constructor(answer = 'A', options = {}, shuffle = true) {
        this.answer = answer;
        this.options = options;
        this.shuffle = shuffle;
    }
}
