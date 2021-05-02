var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./tool/section", "./tool/dress", "./tool/shuffle", "./tool/option", "./cls", "katex/dist/contrib/auto-render"], function (require, exports, section_1, dress_1, shuffle_1, option_1, cls_1, auto_render_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Soil = void 0;
    auto_render_1 = __importDefault(auto_render_1);
    class Soil {
        constructor(gene) {
            this.gene = gene;
            // get from SeedBank API
            this.qn = "";
            this.sol = "";
            // working variables during growth
            this.dict = new cls_1.Dict();
            this.config = new cls_1.Config();
            // state
            this.counter = 0;
            this.errorPile = [];
            this.reset();
        }
        reset() {
            this.qn = this.gene.qn;
            this.sol = this.gene.sol;
            this.dict = new cls_1.Dict();
            this.config = new cls_1.Config();
        }
        recordError(e) {
            if (!this.errorPile.map(x => x.message).includes(e.message))
                this.errorPile.push(e);
        }
        evalCode(code) {
            // injectables
            let { a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z } = this.dict;
            let sections = this.config.sections;
            let answer = this.config.answer;
            let options = this.config.options;
            let question = this.qn;
            let solution = this.sol;
            // execute
            let result;
            try {
                result = eval(code);
            }
            catch (e) {
                if (e.message === 'Cannot convert a Symbol value to a number') {
                    throw CustomError('VariableError', "A variable is used before a value is given.");
                }
                else {
                    throw e;
                }
            }
            //retrieve
            this.dict.update({
                a, b, c, d, e, f, g, h, i, j, k, l, m, n,
                o, p, q, r, s, t, u, v, w, x, y, z,
                A, B, C, D, E, F, G, H, I, J, K, L, M, N,
                O, P, Q, R, S, T, U, V, W, X, Y, Z
            });
            this.config = {
                sections: sections,
                answer: answer,
                options: options
            };
            this.qn = question;
            this.sol = solution;
            return result;
        }
        pushDict() {
            this.counter++;
            this.evalCode(this.gene.populate);
        }
        isValidated() {
            let v = this.gene.validate;
            if (v === "")
                return true;
            v = v.replace('\n', ' '); //is it a bug? only once?
            return this.evalCode(v) === true;
        }
        katex(html) {
            let ele = document.createElement('div');
            ele.innerHTML = html;
            auto_render_1.default(ele);
            let T = ele.innerHTML;
            ele.remove();
            return T;
        }
        runPopulate() {
            while (this.counter <= 1000) {
                try {
                    this.pushDict();
                    if (!this.dict.checked())
                        throw CustomError('PopulationError', 'Dict Check Failed.');
                    if (!this.isValidated())
                        throw CustomError('PopulationError', 'Cannot pass validate.');
                    return true;
                }
                catch (e) {
                    switch (e.name) {
                        case 'MathError':
                            this.recordError(e);
                            if (SHOULD_LOG)
                                console.log(e.stack);
                            break;
                        case 'PopulationError':
                            this.recordError(e);
                            break;
                        default:
                            throw e;
                    }
                }
            }
            ;
            throw CustomError('PopulationError', "No population found after 1000 trials!");
        }
        runSection() {
            // crop section
            this.qn = section_1.ExecSection(this.qn, this.config.sections);
            this.sol = section_1.ExecSection(this.sol, this.config.sections);
            return true;
        }
        runPreprocess() {
            this.evalCode(this.gene.preprocess);
            return true;
        }
        runOption() {
            let nTrial = 0;
            while (nTrial <= 100) {
                nTrial++;
                try {
                    this.qn = option_1.AutoOptions(this.config.options, this.qn, this.dict);
                    return true;
                }
                catch (e) {
                    this.recordError(e);
                    console.log(e.stack);
                    continue;
                }
            }
            ;
            throw CustomError('OptionError', "No valid option generated after 100 trials");
        }
        runSubstitute() {
            // pour
            this.qn = this.dict.substitute(this.qn);
            this.sol = this.dict.substitute(this.sol);
            // dress
            this.qn = dress_1.dress(this.qn);
            this.sol = dress_1.dress(this.sol);
            return true;
        }
        runPostprocess() {
            this.evalCode(this.gene.postprocess);
            return true;
        }
        runShuffle() {
            let shuffler = new shuffle_1.OptionShuffler(this.qn, this.sol, this.config.answer);
            if (shuffler.AreOptionsDuplicated()) {
                this.recordError(CustomError('ShuffleError', 'Duplicated options found!'));
                return false;
            }
            this.qn = shuffler.genQn();
            this.sol = shuffler.genSol();
            this.config.answer = shuffler.genAns();
            return true;
        }
        runKatex() {
            this.qn = this.katex(this.qn);
            this.sol = this.katex(this.sol);
            return true;
        }
        successFruit() {
            return {
                qn: this.qn,
                sol: this.sol,
                ans: this.config.answer,
                counter: this.counter,
                success: true
            };
        }
        errorFruit(e) {
            let printError = (x) => '[' + x.name + '] ' + x.message;
            let stack = this.errorPile.map(printError).join('<br/>');
            return {
                qn: "An Error Occurred!<br/>" + e.name,
                sol: printError(e) + '<br/>' + stack,
                ans: "X",
                counter: this.counter,
                success: false
            };
        }
        nurture() {
            try {
                do {
                    this.reset();
                    this.runPopulate();
                    this.runSection();
                    this.runPreprocess();
                    this.runOption();
                    this.runSubstitute();
                    this.runPostprocess();
                    if (!this.runShuffle())
                        continue;
                    this.runKatex();
                    break;
                } while (true);
                return this.successFruit();
            }
            catch (e) {
                console.error("[MathSoil Error]\n" + e.stack);
                return this.errorFruit(e);
            }
        }
    }
    exports.Soil = Soil;
});
