import {IContext, IMemo} from "../pipe/column.pipe";
import {Pipe} from "../pipe/pipe";

export declare class Middleware {
	constructor(public pipes: Pipe[]);

	run(context: IContext, memo: IMemo): Promise<any>;
}
