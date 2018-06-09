import { isUndefined } from '../../utility/kit';

// It is allowed only inherit from this class, because other strategies
// are tuned for perfomance and are not propogate valid base structure.
export class BasicRow {
	constructor(model) {
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

			return area[pin] || [];
		}

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

	columns(row, pin) {
		return this.columnList(pin);
	}
}