declare global {
    namespace Chance {
        interface Chance {
            prime: (opt: {
                min: number;
                max: number;
            }) => number;
        }
    }
}
declare type randomFunc<T> = () => T;
declare type predicate<T> = (item: T) => boolean;
declare type keyFunc<T> = (item: T) => number | string;
export declare function integer(minInt: number, maxInt: number): number;
export declare function real(min: number, max: number): number;
export declare function prime(min: number, max: number): number;
export declare function he(): string;
export declare function she(): string;
export declare function brute<T>(func: randomFunc<T>, predicate: predicate<T>, trials?: number): T;
export declare function shield<T>(func: randomFunc<T>, predicate: predicate<T>, trials?: number): randomFunc<T>;
export declare function sample<T>(func: randomFunc<T>, length: number): T[];
export declare function unique<T>(func: randomFunc<T>, length: number, key?: keyFunc<T>): T[];
export declare function pick<T>(...items: T[]): {
    one(): T;
    sample(length: number): T[];
    unique(length: number): T[];
};
export declare function shuffle<T>(...items: T[]): T[];
export {};
