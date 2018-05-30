import * as css from '../services/css';
import * as columnService from '../column/column.service';
import { Log } from '../infrastructure/log';
import { Disposable } from '../infrastructure/disposable';

export class LayoutView extends Disposable {
	constructor(model, table, service) {
		super(); 
	
		this.model = model;
		this.table = table;
		this.service = service;

		model.navigationChanged.watch(e => {
			if (e.hasChanges('cell')) {
				const oldColumn = e.changes.cell.oldValue ? e.changes.cell.oldValue.column : {};
				const newColumn = e.changes.cell.newValue ? e.changes.cell.newValue.column : {};

				if (oldColumn.key !== newColumn.key && (oldColumn.viewWidth || newColumn.viewWidth)) {
					const form = this.updateColumnForm();
					this.invalidateColumns(form);
				}
			}
		});

		this.onInit();
	}

	onInit() {
		const model = this.model;

		model.sceneChanged.watch(e => {
			if (e.hasChanges('column')) {
				this.invalidateColumns();
			}
		});

		const styleRow = this.styleRow.bind(this);
		model.layoutChanged.watch(e => {
			if (e.tag.source === 'layout.view') {
				return;
			}

			if (e.hasChanges('columns')) {
				const form = this.updateColumnForm();
				this.invalidateColumns(form);
			}
		});

		model.rowChanged.watch(e => {
			if (e.hasChanges('canResize')) {
				const rows = Array.from(model.style().rows);
				if (e.state.canResize) {
					rows.push(styleRow);
				}
				else {
					const index = model.style.rows.indexOf(styleRow);
					rows.splice(index, 1);
				}
				model.style({ rows });
			}
		});
	}

	updateColumnForm() {
		const model = this.model;
		const layout = model.layout().columns;
		const form = new Map();
		const headRow = this.table.head.row(0);
		if (headRow) {
			const columns = this.table.data.columns();
			let length = columns.length;
			while (length--) {
				const column = columns[length];
				if (!layout.has(column.key)) {
					if (column.canResize) {
						const index = columns.findIndex(c => c === column);
						form.set(column.key, { width: headRow.cell(index).width() });
					}
				}
				else {
					form.set(column.key, { width: layout.get(column.key).width });
				}
			}
		}

		model.layout({ columns: form }, { source: 'layout.view', behavior: 'core' });

		const column = this.model.navigation().column;
		if (column && column.viewWidth) {
			const viewForm = new Map(form);
			viewForm.set(column.key, { width: column.viewWidth });
			return viewForm;
		}

		return form;
	}

	invalidateColumns(form) {
		Log.info('layout', 'invalidate columns');

		const table = this.table;
		const getWidth = columnService.widthFactory(table, form);
		const columns = table.data.columns();
		const style = {};

		let length = columns.length;
		while (length--) {
			const column = columns[length];
			const width = getWidth(column.key);
			if (null !== width) {
				const key = css.escape(column.key);
				const size = width + 'px';
				const sizeStyle = {
					'width': size,
					'min-width': size,
					'max-width': size
				};

				style[`td.q-grid-${key}`] = sizeStyle;
				style[`th.q-grid-${key}`] = sizeStyle;
			}
		}

		const sheet = css.sheet(this.gridId, 'layout-column');
		sheet.set(style);
	}

	styleRow(row, context) {
		const model = this.model;
		const layout = model.layout;
		const form = layout().rows;
		const style = form.get(row);
		if (style) {
			context.class(`resized-${style.height}px`, { height: style.height + 'px' });
		}
	}

	dispose() {
		super.dispose();

		const columnSheet = css.sheet(this.gridId, 'layout-column');
		columnSheet.remove();
	}

	get gridId() {
		return this.model.grid().id;
	}
}