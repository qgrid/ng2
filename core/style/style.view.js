import {View} from '../view';
import {Monitor} from './style.monitor';
import * as columnService from '../column/column.service';
import {getFactory as valueFactory} from '../services/value';
import {noop} from '../utility';
import {VirtualRowStyle, VirtualCellStyle} from './style.virtual';

export class StyleView extends View {
	constructor(model, table) {
		super(model);

		this.table = table;
		this.valueFactory = valueFactory;
		this.active = {
			row: false,
			cell: false
		};

		this.monitor = {
			row: new Monitor(model),
			cell: new Monitor(model)
		};

		this.using(model.sceneChanged.watch(e => {
			if (e.hasChanges('status') && e.state.status === 'stop') {
				this.invalidate();
			}
		}));

		this.using(model.styleChanged.watch(e => {
			if (e.hasChanges('row')) {
				this.active.row = e.state.row !== noop;
			}

			if (e.hasChanges('cell')) {
				this.active.cell = e.state.cell !== noop;
			}

			this.invalidate();
		}));
	}

	invalidate() {
		const active = this.active;
		const model = this.model;
		const isVirtual = model.scroll().mode === 'virtual';
		const isActive = isVirtual || active.row || active.cell;
		if (!isActive) {
			return;
		}

		const table = this.table;
		const valueFactory = this.valueFactory;
		const styleState = model.style();
		const rowMonitor = this.monitor.row;
		const cellMonitor = this.monitor.cell;
		// TODO: improve performance
		const valueCache = new Map();
		const value = (row, column) => {
			let getValue = valueCache.get(column);
			if (!getValue) {
				getValue = valueFactory(column);
				valueCache.set(column, getValue);
			}

			return getValue(row);
		};

		let isRowActive = active.row;
		let isCellActive = active.cell;
		let styleRow = styleState.row;
		let styleCell = styleState.cell;
		if (isVirtual) {
			isRowActive = true;
			isCellActive = true;
			styleRow = new VirtualRowStyle(table).applyFactory();
			styleCell = new VirtualCellStyle(table).applyFactory();
		}

		const columns = table.data.columns();
		const columnMap = columnService.map(columns);
		const bodyRows = table.body.rows();
		const domCell = cellMonitor.enter();
		const domRow = rowMonitor.enter();

		try {
			for (let i = 0, rowsLength = bodyRows.length; i < rowsLength; i++) {
				const bodyRow = bodyRows[i];
				const rowIndex = bodyRow.index;
				const dataRow = bodyRow.model();
				if (!dataRow) {
					continue;
				}

				if (isRowActive) {
					const rowContext = {
						class: domRow(bodyRow),
						row: rowIndex,
						value: value,
						columns: {
							map: columnMap,
							list: columns
						}
					};

					styleRow(dataRow, rowContext);
				}

				if (isCellActive) {
					const cells = bodyRow.cells();
					for (let j = 0, cellsLength = cells.length; j < cellsLength; j++) {
						const cell = cells[j];
						const column = columns[j];
						const cellContext = {
							class: domCell(cell),
							row: rowIndex,
							column: j,
							value: value,
							columns: {
								map: columnMap,
								list: columns
							}
						};

						styleCell(dataRow, column, cellContext);
					}
				}
			}
		}
		finally {
			rowMonitor.exit(domRow);
			cellMonitor.exit(domCell);
		}
	}
}