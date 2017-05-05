import View from 'core/view/view';
import * as css from 'core/services/css';
import * as columnService from 'core/column/column.service';
import {clone} from 'core/services/utility';
import PipeUnit from 'core/pipe/units/pipe.unit';
import log from 'core/infrastructure/log';

export default class LayoutView extends View {
	constructor(model, table, service) {
		super(model);
		this.model = model;
		this.table = table;
		this.service = service;

		this.onInit();
	}

	onInit() {
		const model = this.model;

		model.viewChanged.watch(e => {
			if (e.hasChanges('columns')) {
				this.invalidateColumns();
			}
		});

		model.layoutChanged.watch(e => {
			if (e.hasChanges('columns')) {
				this.invalidateColumns(this.form);
			}
		});

		model.dataChanged.watch(e => {
			if (e.hasChanges('columns')) {
				const columns = model.data().columns;
				const columnMap = columnService.map(columns);
				const index =
					model.columnList()
						.index
						.filter(key => columnMap.hasOwnProperty(key));

				const indexSet = new Set(index);
				const appendIndex = columns.filter(c => !indexSet.has(c.key));
				const orderIndex = Array.from(appendIndex);
				orderIndex.sort((x, y) => {
					if (x.index === y.index) {
						return appendIndex.indexOf(x) - appendIndex.indexOf(y);
					}

					if (x.index < 0) {
						return 1;
					}

					if (y.index < 0) {
						return -1;
					}

					return x.index - y.index;
				});

				index.push(...orderIndex.map(c => c.key));
				model.columnList({index: index}, {behavior: 'core'});
			}
		});

		model.columnListChanged.watch(e => {
			if (e.hasChanges('index') && e.tag.behavior !== 'core') {
				this.service.invalidate('column.list', e.tag, PipeUnit.column);
			}
		});
	}

	get form() {
		const model = this.model;
		const layout = model.layout;
		const state = clone(layout().columns);
		const headRow = this.table.head.row(0);
		if (headRow) {
			const columns = this.table.data.columns();
			let length = columns.length;
			while (length--) {
				const column = columns[length];
				if (!state.hasOwnProperty(column.key)) {
					if (column.canResize) {
						state[column.key] = {width: headRow.cell(column.index).width};
					}
				}
			}

		}

		return state;
	}

	invalidateColumns(form) {
		log.info('layout', 'invalidate columns');

		const model = this.model;
		const getWidth = columnService.widthFactory(model, form);
		const columns = this.table.data.columns();
		const style = {};
		let length = columns.length;
		while (length--) {
			const column = columns[length];
			const width = getWidth(column);
			if (null !== width) {
				const key = css.escape(column.key);
				style[`td.q-grid-${key}, th.q-grid-${key}`] = {
					'width': width,
					'min-width': width,
					'max-width': width
				};
			}
		}

		const sheet = css.sheet(this.styleId);
		sheet.set(style);
	}

	destroy() {
		const sheet = css.sheet(this.styleId);
		sheet.remove();
	}

	get styleId() {
		return `${this.model.grid().id}-${this.table.pin || 'center'}-layout`;
	}
}