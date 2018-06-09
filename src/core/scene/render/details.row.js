import { BasicRow } from './basic.row';
import { sumBy } from '../../utility/kit';
import { AppError } from '../../infrastructure/error';

export class DetailsRow extends BasicRow {
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
		throw new AppError('details.row', `Can't get value from row details`);
	}

	getLabel() {
		throw new AppError('details.row', `Can't get label from row details`);
	}

	setValue() {
		throw new AppError('details.row', `Can't set value to row details`);
	}

	setLabel() {
		throw new AppError('details.row', `Can't set label to row details`);
	}
}