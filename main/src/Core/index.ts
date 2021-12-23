import {
    cal as $cal,
    data as $data,
    list as $list,
    numbers as $numbers,
    shape as $shape,
    shape2D as $shape2D,
    shape3D as $shape3D,
    vector as $vector,
    vector2D as $vector2D,
    vector3D as $vector3D,
    toData as $toData,
    toList as $toList,
    toNumbers as $toNumbers,
    toShape as $toShape,
    toShape2D as $toShape2D,
    toShape3D as $toShape3D,
    toVector as $toVector,
    vec2D as $vec2D,
    vec3D as $vec3D,
    ineq as $ineq,
    optimizer as $optimizer,
    rein as $rein,
    toReins as $toReins,
    lin as $lin,
} from 'ruby'


globalThis.cal = $cal
globalThis.data = $data
globalThis.list = $list
globalThis.numbers = $numbers
globalThis.shape = $shape
globalThis.shape2D = $shape2D
globalThis.shape3D = $shape3D
globalThis.vector = $vector
globalThis.vector2D = $vector2D
globalThis.vector3D = $vector3D
globalThis.toData = $toData
globalThis.toList = $toList
globalThis.toNumbers = $toNumbers
globalThis.toShape = $toShape
globalThis.toShape2D = $toShape2D
globalThis.toShape3D = $toShape3D
globalThis.toVector = $toVector
globalThis.vec2D = $vec2D
globalThis.vec3D = $vec3D
globalThis.ineq = $ineq
globalThis.optimizer = $optimizer
globalThis.rein = $rein
globalThis.toReins = $toReins
globalThis.lin = $lin


import * as $Owl from './Owl/index'
globalThis.owl = $Owl




import * as $Ink from './Ink/index'
globalThis.ink = $Ink







declare global {
    var cal: typeof $cal
    var data: typeof $data
    var list: typeof $list
    var numbers: typeof $numbers
    var shape: typeof $shape
    var shape2D: typeof $shape2D
    var shape3D: typeof $shape3D
    var vector: typeof $vector
    var vector2D: typeof $vector2D
    var vector3D: typeof $vector3D
    var toData: typeof $toData
    var toList: typeof $toList
    var toNumbers: typeof $toNumbers
    var toShape: typeof $toShape
    var toShape2D: typeof $toShape2D
    var toShape3D: typeof $toShape3D
    var toVector: typeof $toVector
    var vec2D: typeof $vec2D
    var vec3D: typeof $vec3D
    var ineq: typeof $ineq
    var optimizer: typeof $optimizer
    var rein: typeof $rein
    var toReins: typeof $toReins
    var lin: typeof $lin
    var owl: typeof $Owl
    var ink: typeof $Ink
}
