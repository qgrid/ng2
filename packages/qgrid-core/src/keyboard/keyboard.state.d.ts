export declare type KeyboardStateStatus = 'release' | 'down' | 'up';

export declare class KeyboardState {
	codes: string[];
	code: string;
	status: 'release' | 'down' | 'up';
}
