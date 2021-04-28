declare type section = [number | string, number];
declare type Fruit = {
    readonly qn: string;
    readonly sol: string;
    readonly ans: string | undefined;
    counter: number;
    readonly success: boolean;
};
declare type Gene = {
    readonly qn: string;
    readonly sol: string;
    readonly populate: string;
    readonly validate: string;
    readonly preprocess: string;
    readonly postprocess: string;
};
