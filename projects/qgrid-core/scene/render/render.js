import { CacheStrategy } from './cache.strategy';
import { DataRow } from './data.row';
import { DetailsRow } from './details.row';
import { get as getLabel } from '../../services/label';
import { get as getValue } from '../../services/value';
import { Node } from '../../node/node';
import { NodeRow, SubheadNodeRow, RowspanNodeRow } from './node.row';
import { PivotRow } from './pivot.row';
import { RowDetails } from '../../row-details/row.details';

export class Renderer {
	constructor(plugin) {
		const { model, observe, observeReply } = plugin;

		const dataRow = new DataRow(plugin);
		const pivotRow = new CacheStrategy(plugin, new PivotRow(plugin, dataRow));
		const nodeRow = new NodeRow(model, pivotRow);
		const nestNodeRow = new CacheStrategy(plugin, nodeRow);
		const subheadNodeRow = new CacheStrategy(plugin, new SubheadNodeRow(nodeRow));
		const rowspanNodeRow = new CacheStrategy(plugin, new RowspanNodeRow(model, nodeRow));
		const rowDetails = new CacheStrategy(plugin, new DetailsRow(model, pivotRow));
		const defaultStrategy = pivotRow;

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
					strategies.set(Node, nestNodeRow);
					break;
			}
		};

		selectNodeRowStrategy();
		observe(model.groupChanged)
			.subscribe(selectNodeRowStrategy);

		// Public interface
		this.defaultStrategy = defaultStrategy;

		this.colspan = (row, column, rowIndex, columnIndex) => {
			const strategy = strategies.get(row.constructor) || defaultStrategy;
			return strategy.colspan(row, column, rowIndex, columnIndex);
		};

		this.rowspan = (row, column, rowIndex, columnIndex) => {
			const strategy = strategies.get(row.constructor) || defaultStrategy;
			return strategy.rowspan(row, column, rowIndex, columnIndex);
		};

		this.columns = (row, pin, rowIndex) => {
			const strategy = strategies.get(row.constructor) || defaultStrategy;
			return strategy.columns(row, pin, rowIndex);
		};

		this.getValue = (row, column, rowIndex, columnIndex) => {
			const strategy = strategies.get(row.constructor) || defaultStrategy;
			return strategy.getValue(row, column, getValue, rowIndex, columnIndex);
		};

		this.setValue = (row, column, value, rowIndex, columnIndex) => {
			const strategy = strategies.get(row.constructor) || defaultStrategy;
			return strategy.setValue(row, column, value, rowIndex, columnIndex);
		};

		this.getLabel = (row, column, rowIndex, columnIndex) => {
			const strategy = strategies.get(row.constructor) || defaultStrategy;
			return strategy.getLabel(row, column, getLabel, rowIndex, columnIndex);
		};

		this.setLabel = (row, column, value, rowIndex, columnIndex) => {
			const strategy = strategies.get(row.constructor) || defaultStrategy;
			return strategy.setLabel(row, column, value, rowIndex, columnIndex);
		};

		this.rows = {
			left: [],
			right: [],
			mid: []
		};

		const invalidateRows = () => {
			const { rows } = model.scene();
			const { pinTop, pinBottom } = model.row();

			this.rows = {
				top: pinTop,
				body: rows,
				bottom: pinBottom
			};
		}

		observeReply(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('rows')) {
					invalidateRows();
				}
			});

		observeReply(model.rowChanged)
			.subscribe(e => {
				if (e.hasChanges('pinTop') || e.hasChanges('pinBottom')) {
					invalidateRows();
				}
			});
	}
}