export interface ICompileResult{
	(entry: object, value: any): string;
}

export declare function compile(path: string): ICompileResult;

