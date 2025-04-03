import fs from 'fs'

const declarationFilePath = '../dist/type/declaration.d.ts'

fs.readFile(declarationFilePath, 'utf8', (err, data) => {
    if (err) return console.log(err)

    data = data.replaceAll(
        'type Point2D = [x: number, y: number];',
        'type Point2D = [x: number, y: number] | number[];'
    )

    data = data.replaceAll(
        'type Point3D = [x: number, y: number, z: number];',
        'type Point3D = [x: number, y: number, z: number] | number[];'
    )

    fs.writeFile(declarationFilePath, data, 'utf8', err => {
        if (err) return console.log(err)
    })
})
