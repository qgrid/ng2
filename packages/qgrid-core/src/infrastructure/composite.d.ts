import { Command } from '../command/command';

export declare class Composite {
  static func<T, A>(list: ((...args: A) => T)[], reducer?: (a: A, t: T) => A, memo?: A): (...args: A) => T;
  static command(list: Command[]): Command;
  static list(list: any[]): any[];
  static object(list: any[], memo: any): any;
}
