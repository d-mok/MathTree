type Fruit = {
    readonly qn: string
    readonly sol: string
    readonly ans: string
    counter: number
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
    populate: string
    validate: string
    preprocess: string
    postprocess: string
}
