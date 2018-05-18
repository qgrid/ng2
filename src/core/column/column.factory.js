import { Guard } from '../infrastructure/guard';
import { assignWith, clone, isUndefined } from '../utility/kit';
import { ColumnView as CustomColumn } from '../scene/view/column.view';
import { TextColumn } from '../column-type/text.column';
import { NumberColumn } from '../column-type/number.column';
import { BoolColumn } from '../column-type/bool.column';
import { DateColumn } from '../column-type/date.column';
import { PasswordColumn } from '../column-type/password.column';
import { ArrayColumn } from '../column-type/array.column';
import { EmailColumn } from '../column-type/email.column';
import { SelectColumn } from '../column-type/select.column';
import { GroupColumn } from '../column-type/group.column';
import { PivotColumn } from '../column-type/pivot.column';
import { RowNumberColumn } from '../column-type/row.number.column';
import { RowIndicatorColumn } from '../column-type/row.indicator.column';
import { RowOptionsColumn } from '../column-type/row.options.column';
import { RowExpandColumn } from '../column-type/row.expand.column';
import { RowDetailsColumn } from '../column-type/row.details.column';
import { PadColumn } from '../column-type/pad.column';
import { TimeColumn } from '../column-type/time.column';
import { UrlColumn } from '../column-type/url.column';
import { FileColumn } from '../column-type/file.column';
import { ImageColumn } from '../column-type/image.column';
import { ReferenceColumn } from '../column-type/reference.column';
import { CurrencyColumn } from '../column-type/currency.column';
import { IdColumn } from '../column-type/id.column';

function merge(target, source) {
	if (target && source) {
		return assignWith(target, source, (s, t) => isUndefined(s) ? t : s);
	}

	return target || clone(source);
}

export function columnFactory(model) {
	const columnList = model.columnList;
	const columnMap = {
		'text': TextColumn,
		'number': NumberColumn,
		'bool': BoolColumn,
		'date': DateColumn,
		'array': ArrayColumn,
		'email': EmailColumn,
		'password': PasswordColumn,
		'select': SelectColumn,
		'group': GroupColumn,
		'pivot': PivotColumn,
		'row-number': RowNumberColumn,
		'row-indicator': RowIndicatorColumn,
		'row-options': RowOptionsColumn,
		'row-expand': RowExpandColumn,
		'row-details': RowDetailsColumn,
		'pad': PadColumn,
		'time': TimeColumn,
		'url': UrlColumn,
		'file': FileColumn,
		'image': ImageColumn,
		'reference': ReferenceColumn,
		'id': IdColumn,
		'currency': CurrencyColumn,
		'custom': CustomColumn
	};

	const create = (entityType, columnType, body) => {
		const Type = columnMap[entityType];
		const reference = columnList().reference;
		const defaultSettings = reference['$default'];
		body = merge(body, defaultSettings);
		const typeSettings = reference[columnType];
		body = merge(body, typeSettings);

		const model = Type.model(body);
		return new Type(model);
	};

	return (type, body = null) => {
		Guard.notNullOrEmpty(type, 'type');

		if (columnMap.hasOwnProperty(type)) {
			return create(type, type, body);
		}

		return create('custom', type, body);
	};
}