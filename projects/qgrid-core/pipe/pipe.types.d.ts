import { Model } from '../model/model';
import { Node } from '../node/node';

export interface PipePivot {
	head: Node;
	rows: any[];
}

export interface PipeFolder {
	pivot: PipePivot;
	rows: any[];
	nodes: any[];
}

export interface PipeContext {
	model: Model;
}

export declare type PipeCallback<TArg, TNextArg> = (arg: TArg, context: PipeContext, next: (nextArg: TNextArg) => void) => void;
export declare type RowsPipe = PipeCallback<any[], any[]>;
export declare type MemoPipe<TArg> = PipeCallback<TArg, PipeFolder>;

export declare type PipeUnitWhy = 'redraw' | 'refresh';