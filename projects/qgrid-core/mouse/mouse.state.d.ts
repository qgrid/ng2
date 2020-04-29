import { Td } from '../dom/td';

export declare interface MouseState {
	code: 'left' | 'right' | 'middle';
	status: 'release' | 'down' | 'up';
	target: Td;
}
