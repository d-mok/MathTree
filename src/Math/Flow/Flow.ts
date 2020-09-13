




/**
* Return a random config of a Combo Options question type.
* @category Flow
* @return {object} The random config object.
* @example
* RndComboConfig // may return {config:[true,true,false], choices:["I and II","I only","I and III","I, II and III"]}
*/
function RndComboConfig(): {
    config: boolean[],
    choices: string[],
    sections: any[][]
} {

    function convertBool(n: number): boolean[] {
        if (n === 0) return [false, false, false]
        if (n === 1) return [false, false, true]
        if (n === 2) return [false, true, false]
        if (n === 3) return [false, true, true]
        if (n === 4) return [true, false, false]
        if (n === 5) return [true, false, true]
        if (n === 6) return [true, true, false]
        if (n === 7) return [true, true, true]
        return [false, false, false]
    }

    function convertText(n: number): string {
        let bools = convertBool(n)
        let opts = []
        if (bools[0]) opts.push("I")
        if (bools[1]) opts.push("II")
        if (bools[2]) opts.push("III")

        if (opts.length === 0) return 'None'
        if (opts.length === 1) return opts[0] + ' only'
        return GrammarJoin(...opts)
    }
    let codes = RndPickN([1, 2, 3, 4, 5, 6, 7], 4)
    let config = codes.map(x => convertBool(x))[0]
    let choices = codes.map(x => convertText(x))

    let sections = []
    sections.push([1, config[0] ? 1 : 0])
    sections.push([2, config[1] ? 1 : 0])
    sections.push([3, config[2] ? 1 : 0])


    return { config, choices, sections }

}
globalThis.RndComboConfig = RndComboConfig



