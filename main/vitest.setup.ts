import { expect } from 'vitest'
// @ts-ignore
import matchers from 'jest-extended/dist/matchers'
import 'jest-extended'

expect.extend(matchers)

import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to'

expect.extend({ toBeDeepCloseTo, toMatchCloseTo })

import 'lodash-extension'
import 'src/index'

import './src/Math/Jest/JestExtend.ts'