import {set as setValue} from '../../services/value';

export class DataRow {
	constructor(model) {
		this.model = model;
	}

	colspan(row, column) {
		return column.colspan;
	}

	rowspan() {
		return 1;
	}

	columns(row, pin) {
		return this.columnList(pin);
	}

	getValue(row, column, select) {
		return select(row);
	}

	setValue(row, column, value) {
		return setValue(row, column, value);
	}

	columnList(pin = null) {
		const sceneState = this.model.scene();
		if (arguments.length) {
			return sceneState.column.area[pin] || [];
		}

		return sceneState.column.line;
	}
}