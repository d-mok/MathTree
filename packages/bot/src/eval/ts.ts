import ts from 'typescript'

function getSourceFile(code: string): ts.SourceFile {
    return ts.createSourceFile('xxx.ts', code, ts.ScriptTarget.ESNext, true)
}

function handleIds(ids: string[]): string[] {
    return [...new Set(ids)].filter($ => !['export', 'undefined'].includes($))
}

export function getAllVars(code: string): string[] {
    const sourceFile = getSourceFile(code)

    let identifiers: string[] = []

    function visit(node: ts.Node) {
        if (ts.isIdentifier(node)) {
            identifiers.push(ts.idText(node))
        }
        node.forEachChild(visit)
    }

    visit(sourceFile)
    return handleIds(identifiers)
}

export function getAllDeclaredVars(code: string): string[] {
    const sourceFile = getSourceFile(code)

    let identifiers: string[] = []

    function isTopLevelDeclared(node: ts.Node): node is ts.Identifier {
        if (!ts.isIdentifier(node)) return false
        if (
            !ts.isVariableDeclaration(node.parent) &&
            !ts.isBindingElement(node.parent) &&
            !ts.isFunctionDeclaration(node.parent)
        ) {
            return false
        }

        let siblings: ts.Node[] = []
        ts.forEachChild(node.parent, n => siblings.push(n))
        if (siblings[0] !== node) return false

        let p: ts.Node = node.parent
        while (p !== undefined) {
            if (ts.isBlock(p)) return false
            if (ts.isForStatement(p)) return false
            if (ts.isForOfStatement(p)) return false
            if (ts.isForInStatement(p)) return false
            p = p.parent
        }
        return true
    }

    function visit(node: ts.Node) {
        if (isTopLevelDeclared(node)) {
            identifiers.push(ts.idText(node))
        }
        node.forEachChild(visit)
    }

    visit(sourceFile)
    return handleIds(identifiers)
}

// export function getTopLevelVars(code: string): string[] {
//     const sourceFile = getSourceFile(code)

//     function getKind(node: ts.Node) {
//         return ts.SyntaxKind[node.kind]
//     }

//     function getChildrenOfKind(kind: string, nodes: ts.Node[]) {
//         let children: ts.Node[] = []
//         for (let node of nodes) {
//             ts.forEachChild(node, $ => {
//                 if (getKind($) === kind) children.push($)
//             })
//         }
//         return children
//     }

//     let FirstStatements = getChildrenOfKind('FirstStatement', [sourceFile])
//     let VariableDeclarationLists = getChildrenOfKind(
//         'VariableDeclarationList',
//         FirstStatements
//     )
//     let VariableDeclarations = getChildrenOfKind(
//         'VariableDeclaration',
//         VariableDeclarationLists
//     )
//     let Identifiers = getChildrenOfKind('Identifier', VariableDeclarations)
//     // @ts-ignore
//     let variables = Identifiers.map($ => $.escapedText)
//     return variables
// }

export function getAST(code: string) {
    const sourceFile = getSourceFile(code)
    let indent = 0

    function printTree(node: ts.Node) {
        console.log(new Array(indent + 1).join(' ') + ts.SyntaxKind[node.kind])
        console.log(node)
        console.log(ts.isMissingDeclaration(node))
        indent++
        ts.forEachChild(node, printTree)
        indent--
    }
    printTree(sourceFile)
}

export function transpile(code: string): string {
    return ts.transpile(code, {
        target: ts.ScriptTarget.ESNext,
    })
}
