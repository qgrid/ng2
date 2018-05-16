import {IContext, IMemo} from './pipe.item';

/**
 * > Under Construction.
 */
export declare class Pipe {
	static readonly data: (memo: any, context: IContext, next: (param: IMemo) => void) => any;
	static readonly filter: (memo: any, context: IContext, next: (param: IMemo) => void) => any;
	static readonly pagination: (memo: any, context: IContext, next: (param: IMemo) => void) => any;
	static readonly sort: (memo: any, context: IContext, next: (param: IMemo) => void) => any;
	static readonly memo: (memo: any, context: IContext, next: (param: IMemo) => void) => any;
	static readonly group: (memo: any, context: IContext, next: (param: IMemo) => void) => any;
	static readonly pivot: (memo: any, context: IContext, next: (param: IMemo) => void) => any;
	static readonly column: (memo: any, context: IContext, next: (param: IMemo) => void) => any;
	static readonly view: (memo: any, context: IContext, next: (param: IMemo) => void) => any;
}
