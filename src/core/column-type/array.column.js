import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { TemplatePath } from '../template/template.path';
import { get as getValue } from '../services/value';
import { isArray, identity } from '../utility/kit';
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
		this.itemLabel = identity;
		this.itemFormat = '';

		this.label = function (row) {
			const value = getValue(row, this);
			if (isArray(value)) {
				let format;
				switch (this.itemType) {
					case 'number':
						format = FormatService.number;
						break;
					case 'date':
						format = FormatService.date;
						break;
					default:
						format = this.itemLabel.bind(this);
						break;
				}

				return value.map(format).join(', ');
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