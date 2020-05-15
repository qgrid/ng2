import { PipeContext, PipeCallback } from '../pipe/pipe.types';

export declare class Middleware<TArg> {
	constructor(pipes: PipeCallback<TArg, any>);

	run(context: PipeContext, memo: TArg): Promise<any>;
}
