import View from 'core/view/view';
import groupBuilder from 'core/group/group.build';
import Log from 'core/infrastructure/log';
import {getFactory as valueFactory} from 'core/services/value';

export default class PivotView extends View {
	constructor(model) {
		super(model);

		this.rows = [];
		this.valueFactory = valueFactory;

		model.viewChanged.watch(() => this.invalidate(model));
	}

	invalidate(model) {
		Log.info('view.pivot', 'invalidate');

		const pivot = model.view().pivot;
		const pivotRows = pivot.rows;
		if (pivotRows.length && model.group().by.length) {
			const build = groupBuilder(model);
			this.rows = build(this.valueFactory);
		}
		else {
			this.rows = pivotRows;
		}
	}

	value(row, column) {
		const rowIndex = this.model.view().rows.indexOf(row);
		return this.rows[rowIndex][column.index];
	}
}