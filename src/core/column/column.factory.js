import {Guard} from '../infrastructure';
import {assignWith, clone, isUndefined} from '../services/utility';
import {ColumnView as CustomColumn} from '../column-type/column.model.view';
import {
	TextColumn,
	NumberColumn,
	BoolColumn,
	DateColumn,
	PasswordColumn,
	ArrayColumn,
	EmailColumn,
	SelectColumn,
	GroupColumn,
	PivotColumn,
	RowNumberColumn,
	RowIndicatorColumn,
	PadColumn,
	TimeColumn,
	UrlColumn,
	FileColumn,
	ImageColumn,
	ReferenceColumn,
	IdColumn
} from '../column-type';

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
		'pad': PadColumn,
		'time': TimeColumn,
		'url': UrlColumn,
		'file': FileColumn,
		'image': ImageColumn,
		'reference': ReferenceColumn,
		'id': IdColumn,
		'custom': CustomColumn
	};

	const create = (entityType, columnType, body) => {
		const Type = columnMap[entityType];
		const settings = columnList().reference[columnType];
		body = merge(body, settings);

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