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
	const start = current * size;
	const contentRows = rows.filter(filterPinnedRows(model));
	model.pagination({ count: contentRows.length }, { source: 'pagination.pipe', behavior: 'core' });


return contentRows.slice(start, start + size);
}

function filterPinnedRows(model) {
	const rowModel = model.row();



const pinnedRows = [...rowModel.pinTop, ...rowModel.pinBottom];
	return row => pinnedRows.every(p => p !== row);
}
