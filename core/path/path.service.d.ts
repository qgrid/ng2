export declare class PathService {
	constructor(public bag: Map);

	cell(path: Node[]): string;

	row(path: Node[]): string;
}
