import { map as getColumnMap } from '../column/column.service';
import { build as pivotBuilder } from '../pivot/pivot.build';
import { Guard } from '../infrastructure/guard';

export function pivotPipe(memo, context, next) {
	Guard.hasProperty(memo, 'rows');

	if (memo.rows.length) {
		const { model } = context;
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