import {map as getColumnMap} from 'core/column/column.service';
import pivotBuilder from 'core/pivot/pivot.build';

export default function pipePivot(memo, context, next) {
	const model = context.model;
	const dataState = model.data();
	const pivotState = model.pivot();
	const build = pivotBuilder(
		getColumnMap(dataState.columns),
		pivotState.by,
		context.valueFactory
	);

	memo.pivot = build(memo.rows);
	next(memo);
}