import { Command } from '../command/command';

export declare class Composite {
	static func<T, A>(list: ((...args: any[]) => T)[], reducer?: (arg0: A, arg1: T) => A, memo?: A): (...args: any[]) => A;
	static command(list: Command[]): Command;
	static list(list: any[]): any[];
	static object(list: any[], memo: any): any;
}
