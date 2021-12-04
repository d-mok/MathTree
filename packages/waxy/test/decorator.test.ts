import { checkIt, inspectIt, acceptIt, captureIt } from '../src/index'
import { positive, negative, isDistinct, makeAdd } from './base'
import 'jest-extended'
import { suite, test, params } from "@testdeck/jest"



class Host {

    @checkIt(positive, negative)
    @acceptIt(positive)
    @inspectIt(function distinct(a, b, c) { return isDistinct([a, b, c]) })
    @captureIt()
    static add(a: number, b: number, c: number = 0) {
        if (a > 100) throw Error('a is too large!')
        if (a > 90) throw 'a is too large!'
        return a + b + c
    }
}

let add = Host.add

let h = 'add(a, b, c = 0)\n'



@suite
class decorator {

    @test
    normal() {
        expect(add(10, -1, -4)).toBe(5)
    }

    @params({ a: -5, b: 1, c: 2, msg: 'arg[0] = -5\nviolate: positive' })
    @params({ a: 3, b: 1, c: 2, msg: 'arg[1] = 1\nviolate: negative' })
    @params({ a: 3, b: -1, c: 2, msg: 'arg[2] = 2\nviolate: negative' })
    @params({ a: 3, b: -1, c: -1, msg: 'args = (3,-1,-1)\nviolate: distinct' })
    @params({ a: 3, b: -1, c: -4, msg: 'args = (3,-1,-4)\nreturn = -2\nviolate: positive' })
    @params({ a: 999, b: -1, c: -2, msg: 'args = (999,-1,-2)\nthrow: Error\nmessage: a is too large!' })
    @params({ a: 99, b: -1, c: -2, msg: 'args = (99,-1,-2)\nthrow: a is too large!' })
    throwing({ a, b, c, msg }: any) {
        expect(() => add(a, b, c)).toThrowWithMessage(Error, h + msg)
    }

}


