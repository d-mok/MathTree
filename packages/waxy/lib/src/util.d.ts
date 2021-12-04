export declare function signature(f: Function): string;
export declare function str(obj: any): string;
export declare function join(arr: any[]): string;
export declare function err(f: fnBranded, ...msgs: string[]): Error;
export declare function brand(f: fn): asserts f is fnBranded;
export declare function transferBrand(source: fnBranded, target: fn): asserts target is fnBranded;
export declare function makeStaticDecorator(transform: (_: any) => any): StaticDecorator;
export declare function makeClassDecorator(transform: (_: any) => any): StaticDecorator;
export declare function getClassStaticNames(constructor: Function): string[];
//# sourceMappingURL=util.d.ts.map