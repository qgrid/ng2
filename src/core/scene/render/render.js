import { Node } from '../../node/node';
import { RowDetails } from '../../row-details/row.details';
import { DataRow } from './data.row';
import { DetailsRow } from './details.row';
import { CacheStrategy } from './cache.strategy';
import { NodeRow, SubheadNodeRow, RowspanNodeRow } from './node.row';

export class Renderer {
	constructor(model) {
		model = model;

		const nodeRow = new CacheStrategy(model, new NodeRow(model));
		const subheadNodeRow = new CacheStrategy(model, new SubheadNodeRow(model));
		const rowspanNodeRow = new CacheStrategy(model, new RowspanNodeRow(model));
		const rowDetails = new CacheStrategy(model, new DetailsRow(model))
		const dataRow = new CacheStrategy(model, new DataRow(model));

		const defaultStrategy = dataRow;
		const strategies = new Map();
		strategies.set(RowDetails, rowDetails);

		const selectNodeRowStrategy = () => {
			const { mode } = model.group();
			switch (mode) {
				case 'subhead':
					strategies.set(Node, subheadNodeRow);
					break;
				case 'rowspan':
					strategies.set(Node, rowspanNodeRow);
					break;
				default:
					strategies.set(Node, nodeRow);
					break;
			}
		};

		selectNodeRowStrategy();
		model.groupChanged.on(selectNodeRowStrategy);

		const resolve = row => {
			const type = row.constructor;
			return strategies.get(type) || defaultStrategy;
		}

		// Public interface
		this.defaultStrategy = defaultStrategy;

		this.colspan = (row, column, rowIndex, columnIndex) => {
			const strategy = resolve(row);
			return strategy.colspan(row, column, rowIndex, columnIndex);
		}

		this.rowspan = (row, column, rowIndex, columnIndex) => {
			const strategy = resolve(row);
			return strategy.rowspan(row, column, rowIndex, columnIndex);
		}

		this.columns = (row, pin, rowIndex) => {
			const strategy = resolve(row);
			return strategy.columns(row, pin, rowIndex);
		}

		this.getValue = (row, column, select, rowIndex, columnIndex) => {
			const strategy = resolve(row);
			return strategy.getValue(row, column, select, rowIndex, columnIndex);
		}

		this.setValue = (row, column, value, rowIndex, columnIndex) => {
			const strategy = resolve(row);
			return strategy.setValue(row, column, value, rowIndex, columnIndex);
		}
	}
}