import * as bundle from './bundle.js'
declare global {
    var Binomial: typeof bundle.Binomial
    var Crammer: typeof bundle.Crammer
    var xPolynomial: typeof bundle.xPolynomial
}

globalThis.Binomial = bundle.Binomial
globalThis.Crammer = bundle.Crammer
globalThis.xPolynomial = bundle.xPolynomial
