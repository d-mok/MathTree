import ts from 'typescript';
export function getAllVars(code) {
    const sourceFile = ts.createSourceFile('xxx.ts', code, ts.ScriptTarget.ESNext, true);
    let identifiers = [];
    function visit(node) {
        if (ts.isIdentifier(node)) {
            identifiers.push(ts.idText(node));
        }
        node.forEachChild(visit);
    }
    visit(sourceFile);
    identifiers = [...new Set(identifiers)];
    identifiers = identifiers.filter($ => !['export'].includes($));
    return identifiers;
}
export function getAllDeclaredVars(code) {
    const sourceFile = ts.createSourceFile('xxx.ts', code, ts.ScriptTarget.ESNext, true);
    let identifiers = [];
    function visit(node) {
        if (ts.isIdentifier(node) &&
            (ts.isVariableDeclaration(node.parent) ||
                ts.isBindingElement(node.parent))) {
            identifiers.push(ts.idText(node));
        }
        node.forEachChild(visit);
    }
    visit(sourceFile);
    identifiers = [...new Set(identifiers)];
    identifiers = identifiers.filter($ => !['export'].includes($));
    return identifiers;
}
export function getTopLevelVars(code) {
    const sourceFile = ts.createSourceFile('xxx.ts', code, ts.ScriptTarget.ESNext, true);
    function getKind(node) {
        return ts.SyntaxKind[node.kind];
    }
    function getChildrenOfKind(kind, nodes) {
        let children = [];
        for (let node of nodes) {
            ts.forEachChild(node, $ => {
                if (getKind($) === kind)
                    children.push($);
            });
        }
        return children;
    }
    let FirstStatements = getChildrenOfKind('FirstStatement', [sourceFile]);
    let VariableDeclarationLists = getChildrenOfKind('VariableDeclarationList', FirstStatements);
    let VariableDeclarations = getChildrenOfKind('VariableDeclaration', VariableDeclarationLists);
    let Identifiers = getChildrenOfKind('Identifier', VariableDeclarations);
    // @ts-ignore
    let variables = Identifiers.map($ => $.escapedText);
    return variables;
}
export function getAST(code) {
    const sourceFile = ts.createSourceFile('xxx.ts', code, ts.ScriptTarget.ESNext, true);
    let indent = 0;
    function printTree(node) {
        console.log(new Array(indent + 1).join(' ') + ts.SyntaxKind[node.kind]);
        console.log(node);
        indent++;
        ts.forEachChild(node, printTree);
        indent--;
    }
    printTree(sourceFile);
}
export function transpile(code) {
    return ts.transpile(code, {
        target: ts.ScriptTarget.ESNext,
    });
}
//# sourceMappingURL=ts.js.map