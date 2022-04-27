import { mapColumns } from '../column/column.service';
import { Guard } from '../infrastructure/guard';
import { buildPivot } from '../pivot/pivot.build';

export function pivotPipe(memo, context, next) {
	Guard.notNull(memo, 'memo');

	const { model } = context;
	if (memo.rows.length) {
		const { valueFactory } = context;
		const { line } = model.columnList();
		const { by } = model.pivot();

		const build = buildPivot(mapColumns(line), by, valueFactory);
		memo.pivot = build(memo.rows, by);
	}

	model.pipe({
		effect: Object.assign({}, model.pipe().effect, { pivot: memo.pivot }),
	}, {
		source: 'pivot.pipe',
		behavior: 'core',
	});

	next(memo);
}
