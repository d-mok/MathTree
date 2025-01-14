import { Soil } from './soil.js'
import { transpile } from 'bot'

declare global {
    var MathSoil2: MathSoil2Cls
}

function transpileGene(gene: Gene): Gene {
    return {
        qn: gene.qn,
        sol: gene.sol,
        populate: transpile(gene.populate),
        validate: transpile(gene.validate),
        preprocess: transpile(gene.preprocess),
        postprocess: transpile(gene.postprocess),
    }
}

class MathSoil2Cls {
    private nurture(gene: Gene): Fruit {
        let soil = new Soil(gene)
        return soil.nurture()
    }

    reap(gene: Gene): Fruit {
        gene = transpileGene(gene)
        return this.nurture(gene)
    }

    inspect(gene: Gene, repeat: number): Inspection {
        gene = transpileGene(gene)
        let counters = []
        let times = []
        let fingerPrints = []
        for (let i = 1; i <= repeat; i++) {
            let fruit = this.nurture(gene)
            if (!fruit.success)
                return {
                    counter: 0,
                    success: false,
                    logs: fruit.logs,
                    time: 0,
                    uniqueness: 0,
                }
            counters.push(fruit.counter)
            times.push(fruit.time)
            fingerPrints.push(this.fingerPrint(fruit))
        }
        return {
            counter: counters.mean(),
            success: true,
            logs: [],
            time: times.mean(),
            uniqueness: (fingerPrints.uniq().length - 1) / (repeat - 1),
        }
    }

    fingerPrint(fruit: Fruit): string {
        // for comparing the uniqueness of the generated questions
        const document = new DOMParser().parseFromString(fruit.sol, 'text/html')
        //remove the first node
        const firstNode = document.body.firstChild
        if (firstNode) document.body.removeChild(firstNode)
        const html = document.body.innerHTML
        return html.replaceAll('✔', '').replaceAll('✘', '')
    }
}

var MathSoil2 = new MathSoil2Cls()
globalThis.MathSoil2 = MathSoil2
