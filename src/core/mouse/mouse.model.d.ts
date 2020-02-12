import { Td } from '../dom/td';

export declare interface MouseModel {
	code: 'left' | 'right' | 'middle';
	status: 'release' | 'down' | 'up';
	target: Td;
}
