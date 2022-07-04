import { Command } from '../command/command';

type Signed<ARGS, RESULT> = (...args: ARGS[]) => RESULT;

export declare class Composite {
  static func<ARGS, RESULT>(
    list: Signed<ARGS, RESULT>[],
    reduce?: (memo: RESULT, value: RESULT) => RESULT,
    initial?: RESULT
  ): Signed<ARGS, RESULT>;

  static command(list: Command[]): Command;
  static list(list: any[]): any[];
  static object(list: Record<any, any>[], memo?: Record<any, any>): Record<any, any>;
}
