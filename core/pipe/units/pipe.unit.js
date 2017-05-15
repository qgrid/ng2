import {defaultPipeUnit} from './default.pipe.unit';
import {viewPipeUnit} from './view.pipe.unit';
import {columnPipeUnit} from './column.pipe.unit';

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
}