import {IContext, IMemo, INext} from './column.pipe';

export interface IPivotPipe {
	(memo: IMemo, context: IContext, next: INext): void;
}

export declare function pivotPipe(memo: IMemo, context: IContext, next: INext): void;
