export declare class Keyboard {
	static isPrintable(code: string): boolean;
	static isControl(code: string): boolean;
	static stringify(code: string, key: string): boolean;
	static translate(code: string, key: string): boolean;
}
