import { defaultPipeUnit } from './units/default.pipe.unit';
import { viewPipeUnit } from './units/view.pipe.unit';
import { columnPipeUnit } from './units/column.pipe.unit';
import { rowPipeUnit } from './units/row.pipe.unit';
import { rowDetailsPipeUnit } from './units/row.details.pipe.unit';
import { groupPipeUnit } from './units/group.pipe.unit';

export class PipeUnit {
	static get default() {
		return defaultPipeUnit;
	}

	static get view() {
		return viewPipeUnit;
	}

	static get column() {
		return columnPipeUnit;
	}

	static get row() {
		return rowPipeUnit;
	}

	static get rowDetails() {
		return rowDetailsPipeUnit;
	}

	static get group() {
		return groupPipeUnit;
	}
}