import { groupBuilder } from '../group/group.build';
import { Log } from '../infrastructure/log';
import { getFactory as valueFactory } from '../services/value';

export class PivotView {
	constructor(model) {
		this.model = model;
		this.rows = [];
		this.valueFactory = valueFactory;

		model.sceneChanged.watch(e => {
			if (e.hasChanges('column') || e.hasChanges('rows')) {
				this.invalidate();
			}
		});
	}

	invalidate() {
		Log.info('view.pivot', 'invalidate');

		const model = this.model;
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

	value(rowIndex, columnIndex) {
		if (rowIndex >= 0 && rowIndex < this.rows.length) {
			return this.rows[rowIndex][columnIndex];
		}

		return null;
	}
}