import { getFactory as valueFactory } from '../services/value';
import { noop } from '../utility/kit';
import { StyleMonitor } from './style.monitor';
import { StyleService } from './style.service';
import { VirtualRowStyle, VirtualCellStyle } from './style.virtual';
import * as columnService from '../column/column.service';

export class StyleLet {
	constructor(plugin) {
		const { model, observeReply } = plugin;

		this.plugin = plugin;
		this.valueFactory = valueFactory;
		this.service = new StyleService(model);
		this.active = {
			row: false,
			cell: false
		};

		this.monitor = {
			row: new StyleMonitor(model),
			cell: new StyleMonitor(model)
		};

		observeReply(model.styleChanged)
			.subscribe(e => {
				if (e.hasChanges('row') || e.hasChanges('rows')) {
					this.active.row = e.state.row !== noop || e.state.rows.length > 0;
				}

				if (e.hasChanges('cell') || e.hasChanges('cells')) {
					this.active.cell = e.state.cell !== noop || e.state.cells.length > 0;
				}
			});
	}

	needInvalidate() {
		const { model } = this.plugin;
		if (model.scene().status !== 'stop') {
			return false;
		}

		const { active } = this;
		const isVirtual = model.scroll().mode === 'virtual';
		const isActive = isVirtual || active.row || active.cell;

		if (!isActive) {
			return false;
		}

		const { invalidate } = model.style();
		const context = {
			model
		};

		return invalidate.canExecute(context) && invalidate.execute(context) !== false;
	}

	invalidate(domCell, domRow) {
		const { model, table } = this.plugin;
		const { valueFactory } = this;
		let { row: isRowActive, cell: isCellActive } = this.active;

		const isVirtual = model.scroll().mode === 'virtual';

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

		const columnList = table.data.columns();
		const columnMap = columnService.map(columnList);

		let visitRow = this.service.row();
		let visitCell = this.service.cell();
		if (isVirtual) {
			isRowActive = true;
			isCellActive = true;
			visitRow = new VirtualRowStyle(table, visitRow).visitFactory();
			visitCell = new VirtualCellStyle(table, visitCell).visitFactory();
		}

		// For performance reason we make rowContext and cellContext the same reference 
		// for the all style calls.
		const rowContext = {
			class: noop,
			row: -1,
			value: null,
			columns: {
				map: columnMap,
				list: columnList
			}
		};

		const cellContext = {
			class: noop,
			row: -1,
			column: -1,
			value: null,
			columns: rowContext.columns
		};

		// To improve performance take rows and cells directly from the bag and not from the DOM table. 
		const { body } = table;
		const { rowToView, columnToView } = table.box.mapper;
		const bodyBag = table.box.bag.body;

		if (isRowActive) {
			const rows = bodyBag.getRowElements();
			for (let tr of rows) {
				const { index, element, model } = tr;
				// This private method we use only for performance, don't use it in other places.
				const row = body.createRowCore(rowToView(index), element);

				rowContext.class = domRow(row);
				rowContext.row = index;
				rowContext.value = value;

				visitRow(model, rowContext);
			}
		}

		if (isCellActive) {
			const cells = bodyBag.getCellElements();
			for (let td of cells) {
				const { rowIndex, columnIndex, element, row, column } = td;
				// This private method we use only for performance, don't use it in other places.
				const cell = body.createCellCore(rowToView(rowIndex), columnToView(columnIndex), element);

				cellContext.class = domCell(cell);
				cellContext.row = rowIndex;
				cellContext.column = columnIndex;
				cellContext.value = value;

				visitCell(row, column, cellContext);
			}
		}
	}
}