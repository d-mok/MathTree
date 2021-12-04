
export function latexAligned(texts: string[]): string {
    let T = ""
    T += "\\begin{aligned}"
    for (let t of texts)
        T += t + " \\\\ "
    T += " \\end{aligned}"
    T = T.replaceAll("=", "&=")
    T = T.replaceAll("&&=", "&=")
    return T
}

export function latexBraced(texts: string[]): string {
    return "\\left\\{" + latexAligned(texts) + "\\right."
}
