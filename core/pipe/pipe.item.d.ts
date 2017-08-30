import {Model} from '../infrastructure/model';

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


export interface IPipe<T> {
	(memo: T, context: IContext, next: INext): void;
}