type IRunResult = () => void;

export declare class Fetch {
	constructor(select: any);

	select: any;
	busy: Promise<any>;
	result: any;

	run(item: any): IRunResult;
}
