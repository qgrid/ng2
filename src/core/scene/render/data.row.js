import { set as setValue } from '../../services/value';
import { set as setLabel } from '../../services/label';
import { isUndefined } from '../../utility/kit';

export class DataRow {
	constructor(model) {
		this.model = model;

		this.setValue = setValue;
		this.setLabel = setLabel;

		let area = {};
		let line = [];
		model.sceneChanged.watch(e => {
			if (e.hasChanges('column')) {
				area = e.state.column.area;
				line = e.state.column.line;
			}
		});

		const columnList = (pin = null) => {
			if (isUndefined(pin)) {
				return line;;
			}

			return  area[pin] || [];
		}

		this.columns = (row, pin) => columnList(pin);
		this.columnList = columnList;
	}

	colspan(row, column) {
		return column.colspan;
	}

	getValue(row, column, select) {
		return select(row, column);
	}

	getLabel(row, column, select) {
		return select(row, column);
	}

	rowspan() {
		return 1;
	}
}