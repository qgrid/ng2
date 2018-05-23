import { Model } from '../infrastructure/model';

export interface PipePivot {
	heads: any[];
	rows: any[];
}

export interface PipeMemo {
	pivot: PipePivot;
	rows: any[];
	nodes: any[];
}

export interface PipeContext {
	model: Model;
}
