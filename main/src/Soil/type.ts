
type Fruit = {
    readonly qn: string,
    readonly sol: string,
    readonly ans: string,
    counter: number,
    readonly success: boolean
    readonly logs: string[]
    readonly time: number
}

type Inspection = {
    readonly counter: number
    readonly success: boolean
    readonly logs: string[]
    readonly time: number
}


type Gene = {
    readonly qn: string
    readonly sol: string
    readonly populate: string
    readonly validate: string
    readonly preprocess: string
    readonly postprocess: string
}
