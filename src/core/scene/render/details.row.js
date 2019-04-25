import { AppError } from '../../infrastructure/error';
import { sumBy } from '../../utility/kit';
import { columnFactory } from '../../column/column.factory';

export class DetailsRow {
	constructor(model, dataRow) {
		const createColumn = columnFactory(model);
		const emptyColumn = createColumn('pad', { key: 'row-details-pad' });

		this.columns = dataRow.getColumns;
		this.rowspan = dataRow.rowspan;

		this.colspan = (rowDetails, column) => {
			return sumBy(dataRow.columnList(column.model.pin), c => c.colspan);
		};

		this.columns = (rowDetails, pin) => {
			if (rowDetails.column.model.pin === pin) {
				return [rowDetails.column];
			}

			return [emptyColumn];
		};

		this.getValue = () => { throw new AppError('details.row', `Can't get value from row details`); };
		this.getLabel = () => { throw new AppError('details.row', `Can't get label from row details`); };
		this.setValue = () => { throw new AppError('details.row', `Can't set value to row details`); };
		this.setLabel = () => { throw new AppError('details.row', `Can't set label to row details`); };
	}
}