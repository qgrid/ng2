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
