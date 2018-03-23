export declare class Fetch {
	constructor(select: any);

	busy: Promise<any>;
	result: any;

	run(item?: any): () => void;
}
