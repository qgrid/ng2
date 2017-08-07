import {Model} from '../infrastructure/model';

export interface IColumnPipe {
	(memo: IMemo, context: IContext, next: INext): void;
}

export interface IPivot {
	heads: any[];
	rows: any[];
}

export interface IMemo {
	rows: any[];
	pivot: IPivot;
	nodes: any[];
}

export interface IContext {
	model: Model;
}

export interface INext {
	(param: IMemo): void;
}

export declare function columnPipe(memo: IMemo, context: IContext, next: INext): void;
