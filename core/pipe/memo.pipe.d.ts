import {IContext, INext} from './column.pipe';

export interface IMemoPipe {
	(data: any[], next: INext, ctx: IContext): void;
}

export declare function memoPipe(data: any[], next: INext, ctx: IContext): void;
