import * as css from '../services/css';
import * as columnService from '../column/column.service';
import { Log } from '../infrastructure/log';

export class LayoutView {
	constructor(model, table, service, disposable) {
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

		disposable.add(() => {
			const sheet = css.sheet(this.gridId, 'layout-column');
			sheet.remove();
		});
	}

	onInit() {
		const model = this.model;

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
				model.style({ rows }, { source: 'layout.view' });
			}
		});

		model.dataChanged.watch(e => {
			if (e.hasChanges('columns')) {
				model.layout({
					columns: new Map()
				}, {
					source: 'layout.view',
					behavior: 'core'
				});
			}
		});

		model.sceneChanged.watch(e => {
			if (e.hasChanges('status')) {
				if (e.state.status === 'stop') {
					this.updateColumnForm();
				}
			}

			if (e.hasChanges('column')) {
				const { columns } = this.model.layout();
				this.invalidateColumns(columns);
			}
		});
	}

	updateColumnForm() {
		const { model, table } = this;
		const { head } = table;
		const { cells } = head.context.bag;
		const layout = model.layout().columns;

		const form = new Map();
		for (let cell of cells) {
			const { column, rowIndex, columnIndex } = cell;
			if (!column.canResize) {
				continue;
			}

			const { key } = column;
			if (layout.has(key)) {
				form.set(key, { width: layout.get(key).width });
			} else {
				const th = head.cell(rowIndex, columnIndex);
				const width = th.width();

				// It can be that clientWidth is zero on start, while css is not applied.
				if (width) {
					form.set(key, { width });
				}
			}
		}

		model.layout({ columns: form }, { source: 'layout.view', behavior: 'core' });

		const { column } = model.navigation();
		if (column && column.viewWidth) {
			const viewForm = new Map(form)
			const columnForm = form.get(column.key);
			viewForm.set(column.key, { width: columnForm ? Math.max(columnForm.width, column.viewWidth) : column.viewWidth });
			return viewForm;
		}

		return form;
	}

	invalidateColumns(form) {
		Log.info('layout', 'invalidate columns');

		const { table } = this;
		const columns = table.data.columns();
		const getWidth = columnService.widthFactory(table, form);

		const style = {};
		let { length } = columns;

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

				style[`td.q-grid-the-${key}`] = sizeStyle;
				style[`th.q-grid-the-${key}`] = sizeStyle;
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

	get gridId() {
		return this.model.grid().id;
	}
}