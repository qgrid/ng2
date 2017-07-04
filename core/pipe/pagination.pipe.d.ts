import {IContext, INext} from "./column.pipe";

export interface IPaginationPipe{
	(data: any[], context: IContext, next: INext): void;
}

export declare function paginationPipe(data: any[], context: IContext, next: INext): void;
