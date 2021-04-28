import { Dict } from '../cls';
/**
* append the array of options to question
* ```typescript
* let question = 'abc<ul><li>*x</li></ul>'
* AutoOptions(question,{x:3})
* // 'abc<ul><li>*x</li><li>2</li><li>4</li><li>5</li></ul>'
* ```
*/
export declare function AutoOptions(instructions: Partial<Dict>, question: string, source: Dict): string;
