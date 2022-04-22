import { FormatService } from '../format/format.service';
import { ColumnView } from '../scene/view/column.view';
import { getValue } from '../services/value';
import { TemplatePath } from '../template/template.path';
import { isArray } from '../utility/kit';
import { DataColumnModel } from './data.column.model';

TemplatePath.register('array-cell', (template, column) => ({
	model: template.for,
	resource: column.key
}));

TemplatePath.register('array-cell-edit', (template, column) => ({
	model: 'edit',
	resource: column.key
}));

export class ArrayColumnModel extends DataColumnModel {
	constructor() {
		super('array');

		this.itemType = 'text';
		this.itemFormat = '';

		this.label = function (row) {
			const value = getValue(row, this);
			if (isArray(value)) {
				let formatter;
				switch (this.itemType) {
					case 'number': {
						formatter = FormatService.number;
						break;
					}
					case 'date':
					case 'datetime': {
						formatter = FormatService.date;
						break;
					}
					default: {
						formatter = this.itemLabel.bind(this);
						break;
					}
				}

				const format = this.itemFormat;
				return value.map(item => formatter(item, format)).join(', ');
			}

			return value;
		};
	}
}

export class ArrayColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? ArrayColumn.assign(model) : new ArrayColumnModel();
	}
}
