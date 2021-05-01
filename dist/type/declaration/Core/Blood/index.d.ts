declare class Blood extends Error {
    constructor(name: string, message: string);
}
declare type alias = Blood;
declare type TypeOfBlood = typeof Blood;
declare global {
    type Blood = alias;
    var Blood: TypeOfBlood;
}
export {};
