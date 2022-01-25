import { Line } from './line';
import { Node } from './node';
import { GroupExpression } from './expression';
import {key} from '@qgrid/core/src/services/pair';

export class GroupSchema {
	plan: Array<(node: Node, line: Line, group: GroupExpression) => void> = [];
	[key: string]: any;

	constructor(public node: Node, public line: Line) {
	}

	apply(group: GroupExpression) {
		this.plan.forEach(p => p(this.node, this.line, group));
	}
}
