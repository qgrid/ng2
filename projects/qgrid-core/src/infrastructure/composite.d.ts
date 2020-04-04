import { Command } from '../command/command';

export declare class Composite {
	static func<T, A>(list: ((...args) => T)[], reducer?: (A, T) => A, memo?: A): (...args) => A;
	static command(list: Command[]): Command;
	static list(list: any[]): any[];
	static object(list: any[], memo: any): any;
}
