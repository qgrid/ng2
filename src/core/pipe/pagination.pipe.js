import { flatView as nodeFlatView } from '../node/node.service';
import { Guard } from '../infrastructure/guard';

export function paginationPipe(memo, context, next) {
	Guard.notNull(memo, 'memo');

	const { model } = context;
	if (model.scroll().mode === 'virtual') {
		next(memo);
		return;
	}

	if (memo.hasOwnProperty('nodes') && memo.nodes.length) {
		const page = paginate(model, memo.nodes);
		memo.rows = nodeFlatView(page);
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
	const start = current * size;
	model.pagination({ count: rows.length }, { source: 'pagination.pipe', behavior: 'core' });
	return rows.slice(start, start + size);
}