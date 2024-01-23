import { expect } from 'vitest'

import * as matchers from 'jest-extended'
expect.extend(matchers)

import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to'
expect.extend({ toBeDeepCloseTo, toMatchCloseTo })

import './src/index'

import './src/Math/Jest/JestExtend.ts'
