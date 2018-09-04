import { Guard } from '../infrastructure/guard';
import { assignWith, clone, isUndefined } from '../utility/kit';
import { ColumnView as CustomColumn } from '../scene/view/column.view';
import { ArrayColumn } from '../column-type/array.column';
import { BoolColumn } from '../column-type/bool.column';
import { CohortColumn } from '../column-type/cohort.column';
import { CurrencyColumn } from '../column-type/currency.column';
import { DateColumn } from '../column-type/date.column';
import { EmailColumn } from '../column-type/email.column';
import { FileColumn } from '../column-type/file.column';
import { GroupColumn } from '../column-type/group.column';
import { GroupSummaryColumn } from '../column-type/group.summary.column';
import { IdColumn } from '../column-type/id.column';
import { ImageColumn } from '../column-type/image.column';
import { NumberColumn } from '../column-type/number.column';
import { PadColumn } from '../column-type/pad.column';
import { PasswordColumn } from '../column-type/password.column';
import { PivotColumn } from '../column-type/pivot.column';
import { ReferenceColumn } from '../column-type/reference.column';
import { RowDetailsColumn } from '../column-type/row.details.column';
import { RowExpandColumn } from '../column-type/row.expand.column';
import { RowIndicatorColumn } from '../column-type/row.indicator.column';
import { RowNumberColumn } from '../column-type/row.number.column';
import { RowOptionsColumn } from '../column-type/row.options.column';
import { SelectColumn } from '../column-type/select.column';
import { TextColumn } from '../column-type/text.column';
import { TimeColumn } from '../column-type/time.column';
import { UrlColumn } from '../column-type/url.column';

function merge(target, source) {
	if (target && source) {
		return assignWith(target, source, (s, t) => isUndefined(s) ? t : s);
	}

	return target || clone(source);
}

export function columnFactory(model) {
	const { columnList } = model;
	const columnMap = {
		'array': ArrayColumn,
		'bool': BoolColumn,
		'cohort': CohortColumn,
		'currency': CurrencyColumn,
		'custom': CustomColumn,
		'date': DateColumn,
		'email': EmailColumn,
		'file': FileColumn,
		'group': GroupColumn,
		'id': IdColumn,
		'image': ImageColumn,
		'number': NumberColumn,
		'pad': PadColumn,
		'password': PasswordColumn,
		'pivot': PivotColumn,
		'reference': ReferenceColumn,
		'row-details': RowDetailsColumn,
		'row-expand': RowExpandColumn,
		'row-indicator': RowIndicatorColumn,
		'row-number': RowNumberColumn,
		'row-options': RowOptionsColumn,
		'select': SelectColumn,
		'group-summary': GroupSummaryColumn,
		'text': TextColumn,
		'time': TimeColumn,
		'url': UrlColumn
	};

	const create = (entityType, columnType, body) => {
		const Type = columnMap[entityType];
		const { reference } = columnList();
		const defaultSettings = reference['$default'];
		body = merge(body, defaultSettings);
		const typeSettings = reference[columnType];
		body = merge(body, typeSettings);

		const model = Type.model(body);
		return new Type(model);
	};

	return (type, body = null) => {
		if (!type) {
			type = 'text';
		}

		if (columnMap.hasOwnProperty(type)) {
			return create(type, type, body);
		}

		return create('custom', type, body);
	};
}
