import {IContext, IMemo} from './pipe.item';

/**
 * > Under Construction.
 */
export declare class PipeUnit {
	static readonly default: [(memo: any, context: IContext, next: (param: IMemo) => void) => any];
	static readonly view: [(memo: any, context: IContext, next: (param: IMemo) => void) => any];
	static readonly column: [(memo: any, context: IContext, next: (param: IMemo) => void) => any];
	static readonly row: [(memo: any, context: IContext, next: (param: IMemo) => void) => any];
	static readonly rowDetails: [(memo: any, context: IContext, next: (param: IMemo) => void) => any];
	static readonly group: [(memo: any, context: IContext, next: (param: IMemo) => void) => any];
}
