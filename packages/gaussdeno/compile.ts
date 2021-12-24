const stuff = await Deno.emit("./index.ts", {
    compilerOptions: {
        "declaration": true,
        "emitDeclarationOnly": true,
        "module": "amd",

    },
})
console.log(stuff)
const keys = Object.keys(stuff.files)
const key = keys.find(k => k.includes("reader.ts.d.ts")) as string
console.log(stuff.files[key])
