import {IContext, INext} from './column.pipe';

export interface IDataPipe {
	(data: any[], context: IContext, next: INext): void;
}

export declare function dataPipe(data: any[], context: IContext, next: INext): void;
