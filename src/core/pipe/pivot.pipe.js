import {map as getColumnMap} from '../column/column.service';
import {build as pivotBuilder} from '../pivot/pivot.build';

export function pivotPipe(memo, context, next) {
	if (memo.rows.length) {
		const model = context.model;
		const dataState = model.data();
		const pivotState = model.pivot();
		const build = pivotBuilder(
			getColumnMap(dataState.columns),
			pivotState.by,
			context.valueFactory
		);

		memo.pivot = build(memo.rows);
	}

	next(memo);
}