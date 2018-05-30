import { Node } from '../../node/node';
import { RowDetails } from '../../row-details/row.details';
import { DataRow } from './data.row';
import { DetailsRow } from './details.row';
import { NodeRow } from './node.row';

export class Renderer {
	constructor(model) {
		this.model = model;

		this.strategies = new Map();
		this.strategies.set(RowDetails, new DetailsRow(model));
		this.strategies.set(Node, new NodeRow(model));
		this.defaultStrategy = new DataRow(model);
	}

	colspan(row, column) {
		const strategy = this.resolve(row);
		return strategy.colspan(row, column);
	}

	rowspan(row, column) {
		const strategy = this.resolve(row);
		return strategy.rowspan(row, column);
	}

	columns(row, pin) {
		const strategy = this.resolve(row);
		return strategy.columns(row, pin);
	}

	getValue(row, column, select) {
		const strategy = this.resolve(row);
		return strategy.getValue(row, column, select);
	}

	setValue(row, column, value) {
		const strategy = this.resolve(row);
		return strategy.setValue(row, column, value);
	}

	resolve(row) {
		const type = row.constructor;
		return this.strategies.get(type) || this.defaultStrategy;
	}
}