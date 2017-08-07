export interface IRunResult{
	(): void;
}

export declare class Fetch {
	constructor(public select: any);

	busy: Promise<any>;
	result: any;

	run(item: any): IRunResult;
}