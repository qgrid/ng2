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

type INext = (param: IMemo) => void;

type IPipe<T> = (memo: T, context: IContext, next: INext) => any;
