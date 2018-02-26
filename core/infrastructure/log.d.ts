export declare class Log {
	constructor();

	static info(source: string, message: string): void;
	static warn(source: string, message: string): void;
	static error(source: string, message: string): void;
}
