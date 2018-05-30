import {PipeContext, PipeMemo} from './pipe.item';

/**
 * > Under Construction.
 */
export declare class Pipe {
	static readonly data: (memo: any, context: PipeContext, next: (param: PipeMemo) => void) => any;
	static readonly filter: (memo: any, context: PipeContext, next: (param: PipeMemo) => void) => any;
	static readonly pagination: (memo: any, context: PipeContext, next: (param: PipeMemo) => void) => any;
	static readonly sort: (memo: any, context: PipeContext, next: (param: PipeMemo) => void) => any;
	static readonly memo: (memo: any, context: PipeContext, next: (param: PipeMemo) => void) => any;
	static readonly group: (memo: any, context: PipeContext, next: (param: PipeMemo) => void) => any;
	static readonly pivot: (memo: any, context: PipeContext, next: (param: PipeMemo) => void) => any;
	static readonly column: (memo: any, context: PipeContext, next: (param: PipeMemo) => void) => any;
	static readonly view: (memo: any, context: PipeContext, next: (param: PipeMemo) => void) => any;
}
