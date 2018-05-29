import {PipeContext, PipeMemo} from './pipe.item';

/**
 * > Under Construction.
 */
export declare class PipeUnit {
	static readonly default: [(memo: any, context: PipeContext, next: (param: PipeMemo) => void) => any];
	static readonly view: [(memo: any, context: PipeContext, next: (param: PipeMemo) => void) => any];
	static readonly column: [(memo: any, context: PipeContext, next: (param: PipeMemo) => void) => any];
	static readonly row: [(memo: any, context: PipeContext, next: (param: PipeMemo) => void) => any];
	static readonly rowDetails: [(memo: any, context: PipeContext, next: (param: PipeMemo) => void) => any];
	static readonly group: [(memo: any, context: PipeContext, next: (param: PipeMemo) => void) => any];
}
