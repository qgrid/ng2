export declare class Fetch {
	busy: Promise<any>;
	result: any;

	constructor(select: any);

	run(item?: any): () => void;
}
