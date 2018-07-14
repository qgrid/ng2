import { Guard } from '../infrastructure/guard';
import { Node } from '../node/node';

export function memoPipe(rows, context, next) {
	Guard.notNull(rows, 'rows');

	const { model } = context;

	model.pipe({
		effect: Object.assign({}, model.pipe().effect, { memo: rows })
	}, {
			source: 'memo.pipe',
			behavior: 'core'
		});

	next({
		rows,
		pivot: { head: new Node('$root', 0), rows: [] },
		nodes: []
	});
}