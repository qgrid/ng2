import { Bag } from '../dom/bag';
import { Td } from '../dom/td';
import { Tr } from '../dom/tr';

export declare class PathService {
	constructor(bag: Bag);

	cell(path: Node[]): Td;
	row(path: Node[]): Tr;
}
