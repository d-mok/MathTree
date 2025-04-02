import * as bundle from './src/Math/bundle.ts'
import fs from 'fs'

const path = './src/Math/bundled.ts'

fs.readFile(path, 'utf8', (err, data) => {
    if (err) return console.log(err)
    data = ''
    data += "import * as bundle from './bundle.js'\n"
    data += 'declare global {\n'
    for (let key in bundle) {
        if (key === 'default') continue
        data += `    var ${key}: typeof bundle.${key}\n`
    }
    data += '}\n'

    data += '\n'
    for (let key in bundle) {
        if (key === 'default') continue

        data += `globalThis.${key} = bundle.${key}\n`
    }
    data += '\n'

    fs.writeFile(path, data, 'utf8', err => {
        if (err) return console.log(err)
    })
})
