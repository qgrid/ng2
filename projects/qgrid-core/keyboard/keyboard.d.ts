export declare class Keyboard {
	static isPrintable(code: string): boolean;
	static isControl(code: string): boolean;
	static stringify(key: string): string;
	static translate(code: string): string;
}
