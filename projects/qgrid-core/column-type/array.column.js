import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { TemplatePath } from '../template/template.path';
import { get as getValue } from '../services/value';
import { isArray } from '../utility/kit';
import { FormatService } from '../format/format.service';

TemplatePath.register('array-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('array-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

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
					case 'number':
						formatter = FormatService.number;
						break;
					case 'date':
						formatter = FormatService.date;
						break;
					default:
						formatter = this.itemLabel.bind(this);
						break;
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