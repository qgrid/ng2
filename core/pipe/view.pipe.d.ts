import {IContext, IMemo, INext} from './column.pipe';

export interface IViewPipe {
	(memo: IMemo, context: IContext, next: INext): void;
}

export declare function viewPipe(memo: IMemo, context: IContext, next: INext): void;
