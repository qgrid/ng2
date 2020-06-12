export declare class Keyboard {
	static isPrintable(key: string): boolean;
	static isControl(key: string): boolean;
	static stringify(key: string): string;
	static translate(code: string): string;
}
