declare var SHOULD_LOG: boolean;
declare class CustomErrorCls extends Error {
    constructor(name: string, message: string);
}
declare function CustomError(name: string, message: string): CustomErrorCls;
declare function MathError(message: string): CustomErrorCls;
declare function Should(condition: boolean, msg?: string): void;
