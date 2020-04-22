import {PipeContext, PipeMemo} from '../pipe/pipe.item';
import {Pipe} from '../pipe/pipe';

export declare class Middleware {
	constructor(pipes: Pipe[]);

	pipes: Pipe[];

	run(context: PipeContext, memo: PipeMemo): Promise<any>;
}
