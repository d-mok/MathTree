
class Blood extends Error {
    constructor(name: string, message: string) {
        super(message);
        this.name = name + 'Error'
    }
}



type alias = Blood
type TypeOfBlood = typeof Blood

declare global {
    type Blood = alias
    var Blood: TypeOfBlood
}
globalThis.Blood = Blood

export { }
