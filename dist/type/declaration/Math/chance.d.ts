declare global {
    namespace Chance {
        interface Chance {
            prime: (opt: {
                min: number;
                max: number;
            }) => number;
        }
    }
    var chance: Chance.Chance;
}
export {};
