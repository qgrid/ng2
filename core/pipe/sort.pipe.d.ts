import {IContext, INext} from './column.pipe';

export interface ISortPipe{
	(data: any[], context: IContext, next: INext): void;
}

export declare function sortPipe(data: any[], context: IContext, next: INext): void;


