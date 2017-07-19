export declare class PathService {
	constructor(bag: Map<any, any>);
	bag: Map<any, any>;
	cell(path: Node[]): string;
	row(path: Node[]): string;
}
