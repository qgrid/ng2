import {flatView as nodeFlatView} from '../node';

export function paginationPipe(memo, context, next) {
	const model = context.model;
	if (model.scroll().mode === 'virtual') {
		next(memo);
		return;
	}

	if (memo.hasOwnProperty('rows')) {
		const rows = memo.nodes.length ? nodeFlatView(memo.nodes) : memo.rows;
		memo.rows = paginate(model, rows);
		next(memo);
		return;
	}

	const rows = paginate(model, memo);
	next(rows);
}

function paginate(model, rows) {
	const paginationState = model.pagination();
	const size = paginationState.size;
	const current = paginationState.current;
	const start = current * size;
	model.pagination({count: rows.length}, {source: 'pagination.pipe', behavior: 'core'});
	return rows.slice(start, start + size);
}