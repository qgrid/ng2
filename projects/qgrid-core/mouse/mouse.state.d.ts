import { Td } from '../dom/td';

export declare class MouseState {
	code: 'left' | 'right' | 'middle';
	status: 'release' | 'down' | 'up';
	target: Td;
}
