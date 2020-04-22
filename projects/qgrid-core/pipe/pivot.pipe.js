import { map as getColumnMap } from '../column/column.service';
import { build as pivotBuilder } from '../pivot/pivot.build';
import { Guard } from '../infrastructure/guard';

export function pivotPipe(memo, context, next) {
	Guard.hasProperty(memo, 'rows');

	const { model } = context;
	if (memo.rows.length) {
		const { valueFactory } = context;
		const { line } = model.columnList();
		const { by } = model.pivot();

		const build = pivotBuilder(getColumnMap(line), by, valueFactory);
		memo.pivot = build(memo.rows);
	}

	model.pipe({
		effect: Object.assign({}, model.pipe().effect, { pivot: memo.pivot })
	}, {
		source: 'pivot.pipe',
		behavior: 'core'
	});

	next(memo);
}