export * from './Algebra/Algebra.js'
export * from './Algebra/Calculus.js'
export * from './Algebra/Circle.js'
export * from './Algebra/Quadratic.js'
export * from './Algebra/Linear.js'
export * from './Algebra/Polynomial.js'
export * from './Algebra/Transform.js'

export * from './Code/Assertion.js'
export * from './Code/Combinatorics.js'
export * from './Code/Function.js'
export * from './Code/Geometry.js'
export * from './Code/Latex.js'
export * from './Code/LinearProgram.js'
export * from './Code/Numeracy.js'
export * from './Code/PhyConst.js'
export * from './Code/PhyEq.js'
export * from './Code/Random.js'
export * from './Code/RandomShake.js'
export * from './Code/RandomUtil.js'
export * from './Code/Relation.js'
export * from './Code/Sequence.js'
export * from './Code/Shake.js'
export * from './Code/Stat.js'
export * from './Code/Text.js'
export * from './Code/Triangle.js'
export * from './Code/Trigonometry.js'
export * from './Code/Utility.js'
export * from './Code/Vector.js'
export * from './Code/Vector3D.js'

export * from './Builder/index.js'

export function deepBlurize<F extends (...args: any[]) => any>(f: F): F {
    return function (...args: any[]) {
        let result = f(...args)
        return Object.deepMap(result, (value: any) => {
            if (typeof value === 'number') return value.blur()
            return value
        })
    } as F
}
