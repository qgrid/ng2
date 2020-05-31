import { Td } from '../dom/td';

export declare type MouseStateCode = 'left' | 'right' | 'middle' | null;
export declare type MouseStateStatus = 'release' | 'down' | 'up';

export declare class MouseState {
	code: MouseStateCode;
	status: MouseStateStatus;
	target: Td;
	timestamp: number;
}
