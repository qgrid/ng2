import {View} from '../view';
import {groupBuilder} from '../group';
import {Log} from '../infrastructure';
import {getFactory as valueFactory} from '../services/value';

export class PivotView extends View {
	constructor(model) {
		super(model);

		this.rows = [];
		this.valueFactory = valueFactory;

		this.using(model.viewChanged.watch(() =>
			this.invalidate(model)
		));
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