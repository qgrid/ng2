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

	needInvalidate() {
		const active = this.active;
		const model = this.model;
		const isVirtual = model.scroll().mode === 'virtual';
		const isActive = isVirtual || active.row || active.cell;

		if (!isActive) {
			return false;
		}

		const styleState = model.style();
		const context = {model};
		return styleState.invalidate.canExecute(context) && styleState.invalidate.execute(context) !== false;
	}

	invalidate(domCell, domRow) {
		const active = this.active;
		const model = this.model;
		const styleState = model.style();
		const isVirtual = model.scroll().mode === 'virtual';

		const table = this.table;
		const valueFactory = this.valueFactory;
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

		// for performance reason we make rowContext and cellContext the same reference for the all style calls
		const rowContext = {
			class: noop,
			row: -1,
			value: null,
			columns: {
				map: columnMap,
				list: columns
			}
		};

		const cellContext = {
			class: noop,
			row: -1,
			column: -1,
			value: null,
			columns: rowContext.columns
		};

		for (let i = 0, rowsLength = bodyRows.length; i < rowsLength; i++) {
			const bodyRow = bodyRows[i];
			const rowIndex = bodyRow.index;
			const dataRow = bodyRow.model();
			if (!dataRow) {
				continue;
			}

			if (isRowActive) {
				rowContext.class = domRow(bodyRow);
				rowContext.row = rowIndex;
				rowContext.value = value;

				styleRow(dataRow, rowContext);
			}

			if (isCellActive) {
				const cells = bodyRow.cells();
				for (let j = 0, cellsLength = cells.length; j < cellsLength; j++) {
					const cell = cells[j];
					const dataCell = cell.model();
					if (!dataCell) {
						continue;
					}

					cellContext.class = domCell(cell);
					cellContext.row = rowIndex;
					cellContext.column = j;
					cellContext.value = value;

					styleCell(dataRow, dataCell.column, cellContext);
				}
			}
		}
	}
}