import { QuestionHTML } from './html.js';
import { dice } from 'fate';
import _ from 'lodash';
function produce(source, assigned) {
    if (assigned === source) {
        return RndShake(source);
    }
    if (_.isFunction(assigned)) {
        let f = () => assigned(source);
        return dice(f).forbid(source).unique().rolls(3);
    }
    if (Array.isArray(assigned)) {
        if (assigned.length === 1) {
            let fake = assigned[0];
            return [source, fake, fake].shuffled();
        }
        if (assigned.length === 2) {
            return [source, ...assigned, ...assigned].shuffled();
        }
        return assigned.shuffled();
    }
    return RndShake(source);
}
export function AutoOptions(instructions, question, source) {
    if (Object.keys(instructions).length === 0)
        return question;
    let Qn = new QuestionHTML(question);
    let patches = _.mapValues(instructions, (v, k) => produce(source[k], v));
    let dicts = (i) => _.mapValues(patches, $ => $[i]);
    if (Qn.liCount() === 1) {
        Qn.cloneLi(0, 3);
        Qn.printInLi(1, { ...source, ...dicts(0) });
        Qn.printInLi(2, { ...source, ...dicts(1) });
        Qn.printInLi(3, { ...source, ...dicts(2) });
        return Qn.export();
    }
    if (Qn.liCount() === 2) {
        Qn.cloneLi(0);
        Qn.cloneLi(1);
        Qn.printInLi(2, { ...source, ...dicts(0) });
        Qn.printInLi(3, { ...source, ...dicts(0) });
        return Qn.export();
    }
    return question;
}
