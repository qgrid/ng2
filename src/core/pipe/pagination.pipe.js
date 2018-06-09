import { Guard } from '../infrastructure/guard';

export function paginationPipe(memo, context, next) {
	Guard.notNull(memo, 'memo');

	const { model } = context;
	if (model.scroll().mode === 'virtual') {
		next(memo);
		return;
	}

	if (memo.hasOwnProperty('nodes') && memo.nodes.length) {
		const { flattenFactory } = model.group();
		const page = paginate(model, memo.nodes);
		const flatten = flattenFactory(model);
		memo.rows = flatten(page);
		next(memo);
		return;
	}

	if (memo.hasOwnProperty('rows')) {
		const page = paginate(model, memo.rows);
		memo.rows = page;
		next(memo);
		return;
	}

	const rows = paginate(model, memo);
	next(rows);
}

function paginate(model, rows) {
	const { size, current } = model.pagination();
	const { pinTop, pinBottom } = model.row();
	const start = current * size;
	const pinSet = new Set([...pinTop, ...pinBottom]);

	if (pinSet.size) {
		rows = rows.filter(row => !pinSet.has(row))
	}

	model.pagination({ count: rows.length }, { source: 'pagination.pipe', behavior: 'core' });

	return rows.slice(start, start + size);
}

