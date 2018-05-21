import { DataRow } from './data.row';
import { sumBy } from '../../utility/kit';

export class DetailsRow extends DataRow {
	constructor(model) {
		super(model);
	}

	colspan(rowDetails, column) {
		return sumBy(this.columnList(column.model.pin), c => c.colspan);
	}

	columns(rowDetails, pin) {
		if (rowDetails.column.model.pin === pin) {
			return [rowDetails.column];
		}

		return this.columnList(pin);
	}

	getValue() {
		return null;
	}
}