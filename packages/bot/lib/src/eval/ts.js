import ts from "typescript";
export function getTopLevelVars(code) {
    const sourceFile = ts.createSourceFile("xxx.ts", code, ts.ScriptTarget.ESNext, false);
    function getKind(node) {
        return ts.SyntaxKind[node.kind];
    }
    function getChildrenOfKind(kind, nodes) {
        let children = [];
        for (let node of nodes) {
            ts.forEachChild(node, ($) => {
                if (getKind($) === kind)
                    children.push($);
            });
        }
        return children;
    }
    let FirstStatements = getChildrenOfKind("FirstStatement", [sourceFile]);
    let VariableDeclarationLists = getChildrenOfKind("VariableDeclarationList", FirstStatements);
    let VariableDeclarations = getChildrenOfKind("VariableDeclaration", VariableDeclarationLists);
    let Identifiers = getChildrenOfKind("Identifier", VariableDeclarations);
    // @ts-ignore
    let variables = Identifiers.map(($) => $.escapedText);
    return variables;
}
function getAST(code) {
    const sourceFile = ts.createSourceFile("xxx.ts", code, ts.ScriptTarget.ESNext, false);
    let indent = 0;
    function printTree(node) {
        console.log(new Array(indent + 1).join(" ") + ts.SyntaxKind[node.kind]);
        console.log(node);
        indent++;
        ts.forEachChild(node, printTree);
        indent--;
    }
    printTree(sourceFile);
}
// @ts-ignore
globalThis.getAST = getAST;
export function transpile(code) {
    return ts.transpile(code, {
        target: ts.ScriptTarget.ESNext,
    });
}
// @ts-ignore
globalThis.transpile = transpile;
//# sourceMappingURL=ts.js.map