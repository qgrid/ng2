import {Bag} from '../dom/bag';

export declare class PathService {
	constructor(bag: Bag);

	cell(path: Node[]): string;
	row(path: Node[]): string;
}
