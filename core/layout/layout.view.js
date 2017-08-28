import {View} from '../view';
import * as css from '../services/css';
import * as columnService from '../column/column.service';
import {clone} from '../utility';
import {Log} from '../infrastructure';

export class LayoutView extends View {
	constructor(model, table, service) {
		super(model);
		this.model = model;
		this.table = table;
		this.service = service;

		this.onInit();
	}

	onInit() {
		const model = this.model;

		model.sceneChanged.watch(e => {
			if (e.hasChanges('column')) {
				this.invalidateColumns();
			}
		});

		model.layoutChanged.watch(e => {
			if (e.hasChanges('columns')) {
				const form = this.getForm();
				this.invalidateColumns(form);
			}
		});
	}

	getForm() {
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
						const index = columns.findIndex(c => c === column);
						state[column.key] = {width: headRow.cell(index).width()};
					}
				}
			}

		}

		return state;
	}

	invalidateColumns(form) {
		Log.info('layout', 'invalidate columns');

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
				const sizeStyle = {
					'width': width,
					'min-width': width,
					'max-width': width
				};

				style[`td.q-grid-${key}`] = sizeStyle;
				style[`th.q-grid-${key}`] = sizeStyle;
			}
		}

		const sheet = css.sheet(this.gridId, 'layout');
		sheet.set(style);
	}

	dispose() {
		super.dispose();

		const sheet = css.sheet(this.gridId, 'layout');
		sheet.remove();
	}

	get gridId() {
		return this.model.grid().id;
	}
}