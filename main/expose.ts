//@ts-ignore
import * as bundle from './build/Math/bundle.js' // build by task
import fs from 'fs'

const path = './src/Math/bundled.ts'

fs.readFile(path, 'utf8', (err, data) => {
    if (err) return console.log(err)
    data = ''
    data += "import * as bundle from './bundle.js'\n\n"
    data += 'declare global {\n'
    for (let key in bundle) {
        if (key === 'default') continue
        data += `    var ${key}: typeof bundle.${key}\n`
    }
    data += '}\n\n'

    for (let key in bundle) {
        if (key === 'default') continue

        data += `globalThis.${key} = bundle.${key}\n`
    }
    data += '\n'

    fs.writeFile(path, data, 'utf8', err => {
        if (err) return console.log(err)
    })
})

fs.rmSync('./build', { recursive: true, force: true })
