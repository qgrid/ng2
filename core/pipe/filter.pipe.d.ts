import {IContext, INext} from './column.pipe';

export interface IFilterPipe{
	(data: any[], context: IContext, next: INext): void;
}

export declare function filterPipe(data: any[], context: IContext, next: INext): void;
