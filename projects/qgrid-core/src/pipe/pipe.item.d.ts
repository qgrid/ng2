import { Model } from '../infrastructure/model';
import { Node } from '../node/node';

export interface PipePivot {
	head: Node;
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
