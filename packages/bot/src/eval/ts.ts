import ts from 'typescript'

export function getAllVars(code: string): string[] {
    const sourceFile = ts.createSourceFile(
        'xxx.ts',
        code,
        ts.ScriptTarget.ESNext,
        true
    )

    let identifiers: string[] = []

    function visit(node: ts.Node) {
        if (ts.isIdentifier(node)) {
            identifiers.push(ts.idText(node))
        }
        node.forEachChild(visit)
    }

    visit(sourceFile)
    identifiers = [...new Set(identifiers)]
    identifiers = identifiers.filter($ => !['export'].includes($))
    return identifiers
}

export function getAllDeclaredVars(code: string): string[] {
    const sourceFile = ts.createSourceFile(
        'xxx.ts',
        code,
        ts.ScriptTarget.ESNext,
        true
    )

    let identifiers: string[] = []

    function visit(node: ts.Node) {
        if (
            ts.isIdentifier(node) &&
            (ts.isVariableDeclaration(node.parent) ||
                ts.isBindingElement(node.parent))
        ) {
            identifiers.push(ts.idText(node))
        }
        node.forEachChild(visit)
    }

    visit(sourceFile)
    identifiers = [...new Set(identifiers)]
    identifiers = identifiers.filter($ => !['export'].includes($))
    return identifiers
}

export function getTopLevelVars(code: string): string[] {
    const sourceFile = ts.createSourceFile(
        'xxx.ts',
        code,
        ts.ScriptTarget.ESNext,
        true
    )

    function getKind(node: ts.Node) {
        return ts.SyntaxKind[node.kind]
    }

    function getChildrenOfKind(kind: string, nodes: ts.Node[]) {
        let children: ts.Node[] = []
        for (let node of nodes) {
            ts.forEachChild(node, $ => {
                if (getKind($) === kind) children.push($)
            })
        }
        return children
    }

    let FirstStatements = getChildrenOfKind('FirstStatement', [sourceFile])
    let VariableDeclarationLists = getChildrenOfKind(
        'VariableDeclarationList',
        FirstStatements
    )
    let VariableDeclarations = getChildrenOfKind(
        'VariableDeclaration',
        VariableDeclarationLists
    )
    let Identifiers = getChildrenOfKind('Identifier', VariableDeclarations)
    // @ts-ignore
    let variables = Identifiers.map($ => $.escapedText)
    return variables
}

export function getAST(code: string) {
    const sourceFile = ts.createSourceFile(
        'xxx.ts',
        code,
        ts.ScriptTarget.ESNext,
        true
    )
    let indent = 0

    function printTree(node: ts.Node) {
        console.log(new Array(indent + 1).join(' ') + ts.SyntaxKind[node.kind])
        console.log(node)
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
