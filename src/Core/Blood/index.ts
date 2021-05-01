

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

// function CustomError(name: string, message: string) {
//     return new CustomErrorCls(name, message)
// }
// globalThis.CustomError = CustomError

// function MathError(message: string) {
//     return new CustomErrorCls('MathError', message)
// }
// globalThis.MathError = MathError


// function Should(condition: boolean, msg: string = "Should condition failed!") {
//     if (!condition) {
//         let caller = (new Error()).stack!.split("\n")[2].trim().split(" ")[1]
//         // let caller = 'function'
//         caller = caller ?? 'Anonymous '
//         throw MathError(caller + ': ' + msg)
//     }
// }
// globalThis.Should = Should


