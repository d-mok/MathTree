declare type roll<T> = () => T;
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
declare type predicate<T> = (item: T) => boolean;
declare type keyFunc<T> = (item: T) => number | string;
export declare function integer(minInt: number, maxInt: number): number;
export declare function real(min: number, max: number): number;
export declare function prime(min: number, max: number): number;
export declare function he(): string;
export declare function she(): string;
export declare function roll<T>(func: roll<T>): {
    brute(predicate: predicate<T>): T;
    shield(predicate: predicate<T>): roll<T>;
    sample(length: number): T[];
    unique(length: number, key?: keyFunc<T> | undefined): T[];
};
export declare function array<T>(items: T[]): {
    one(): T;
    sample(length: number): T[];
    unique(length: number): T[];
    shuffle(): T[];
    balanced(length: number): T[];
};
export {};
