import { isUndefined } from '../../utility/kit';

function defaultGetValue(row, column, select) {
	return select(row, column);
}

// It is allowed only inherit from this class, because other strategies
// are tuned for performance and are not propagate valid base structure.
export class BasicRow {
	constructor(model) {
		let area = {};
		let line = [];
		let pivotRows = [];

		model.sceneChanged.watch(e => {
			if (e.hasChanges('column')) {
				area = e.state.column.area;
				line = e.state.column.line;
			}

			if (e.hasChanges('column') || e.hasChanges('rows')) {
				const { rows } = model.view().pivot;
				if (rows.length) {
					if (model.group().by.length) {
						const build = groupBuilder(model);
						pivotRows = build(this.valueFactory);
					} else {
						pivotRows = rows;
					}

					const firstPivotIndex = e.state.column.line.findIndex(c => c.model.type === 'pivot');
					this.getValue =
						this.getLabel = (row, column, select, rowIndex, columnIndex) => {
							if (column.type === 'pivot') {
								return pivotRows[rowIndex][columnIndex - firstPivotIndex];
							}

							return select(row, column);
						};

				} else {
					pivotRows = [];
					this.getValue = this.getLabel = defaultGetValue;
				}
			}
		});

		const columnList = (pin = null) => {
			if (isUndefined(pin)) {
				return line;;
			}

			return area[pin] || [];
		}

		this.columnList = columnList;
		this.getLabel = this.getValue = defaultGetValue;
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
}