import {IContext, IMemo, INext} from './column.pipe';

export interface IGroupPipe {
	(memo: IMemo, context: IContext, next: INext): void;
}

export declare function groupPipe(memo: IMemo, context: IContext, next: INext): void;
