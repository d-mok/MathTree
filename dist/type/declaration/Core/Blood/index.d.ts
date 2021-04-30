declare class Blood extends Error {
    constructor(name: string, message: string);
}
declare type alias = Blood;
declare type TypeOfFolder = typeof Blood;
declare global {
    type Blood = alias;
    var Blood: TypeOfFolder;
}
export {};
