import { columnPipeUnit } from './units/column.pipe.unit';
import { columnIndexPipeUnit } from './units/column.index.pipe.unit';
import { defaultPipeUnit } from './units/default.pipe.unit';
import { groupPipeUnit } from './units/group.pipe.unit';
import { rowDetailsPipeUnit } from './units/row.details.pipe.unit';
import { viewPipeUnit } from './units/view.pipe.unit';
import { rowPipeUnit } from './units/row.pipe.unit';

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

	static get columnIndex() {
		return columnIndexPipeUnit;
	}

	static get rowDetails() {
		return rowDetailsPipeUnit;
	}

	static get group() {
		return groupPipeUnit;
	}

	static get row() {
		return rowPipeUnit;
	}
}