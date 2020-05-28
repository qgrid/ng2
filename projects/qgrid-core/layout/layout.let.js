import { Log } from '../infrastructure/log';
import * as css from '../services/css';
import * as columnService from '../column/column.service';
import { Fastdom } from '../services/fastdom';
import { selectColumn } from '../navigation/navigation.state.selector';

export class LayoutLet {
	constructor(plugin) {
		const { model, observeReply, disposable } = plugin;
		const styleRow = this.styleRow.bind(this);

		this.plugin = plugin;

		observeReply(model.navigationChanged)
			.subscribe(e => {
				if (e.hasChanges('cell')) {
					const { oldValue, newValue } = e.changes.cell;
					const oldColumn = oldValue ? oldValue.column : {};
					const newColumn = newValue ? newValue.column : {};

					if (oldColumn.key !== newColumn.key && (oldColumn.viewWidth || newColumn.viewWidth)) {
						Fastdom.measure(() => {
							const form = this.updateColumnForm();
							Fastdom.mutate(() => this.invalidateColumns(form));
						});
					}
				}
			});

		observeReply(model.layoutChanged)
			.subscribe(e => {
				if (e.tag.source === 'layout.let') {
					return;
				}

				if (e.hasChanges('columns')) {
					Fastdom.measure(() => {
						const form = this.updateColumnForm();
						Fastdom.mutate(() => this.invalidateColumns(form));
					});
				}
			});

		observeReply(model.rowChanged)
			.subscribe(e => {
				if (e.hasChanges('canResize')) {
					const rows = Array.from(model.style().rows);
					if (e.state.canResize) {
						rows.push(styleRow);
					}
					else {
						const index = model.style.rows.indexOf(styleRow);
						rows.splice(index, 1);
					}
					model.style({ rows }, { source: 'layout.let' });
				}
			});

		observeReply(model.dataChanged)
			.subscribe(e => {
				if (e.hasChanges('columns')) {
					model.layout({
						columns: new Map()
					}, {
						source: 'layout.let',
						behavior: 'core'
					});
				}
			});

		observeReply(model.viewChanged)
			.subscribe(e => {
				if (e.hasChanges('columns')) {
					const columns = columnService.flatten(e.state.columns);
					const hasNotDefaultWidth = x => x.width !== null || x.minWidth !== null || x.maxWidth !== null;
					if (columns.some(hasNotDefaultWidth)) {
						Fastdom.mutate(() => {
							const { columns } = model.layout();
							this.invalidateColumns(columns);
						});
					}
				}
			});

		disposable.add(() => {
			const sheet = css.sheet(this.gridId, 'column-layout');
			sheet.remove();
		});
	}

	updateColumnForm() {
		const { model, table } = this.plugin;
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
				const { width } = layout.get(key);
				form.set(key, { width });
			} else {
				const th = head.cell(rowIndex, columnIndex);
				const width = th.width();

				// It can be that clientWidth is zero on start, while css is not applied.
				if (width) {
					form.set(key, { width });
				}
			}
		}

		model.layout({ columns: form }, { source: 'layout.let', behavior: 'core' });

		const column = selectColumn(model.navigation());
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

		const { table } = this.plugin;
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

				style[`.q-grid-the-${key}`] = sizeStyle;
			}
		}

		const sheet = css.sheet(this.gridId, 'column-layout');
		sheet.set(style);
	}

	styleRow(row, context) {
		const { model } = this.plugin;
		const { layout } = model;

		const form = layout().rows;
		const style = form.get(row);
		if (style) {
			context.class(`resized-${style.height}px`, { height: style.height + 'px' });
		}
	}

	get gridId() {
		return this.plugin.model.grid().id;
	}
}