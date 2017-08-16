import {flatView as nodeFlatView, Node} from '../node';

export function viewPipe(memo, context, next) {
	const model = context.model;
	let rows = memo.rows;
	if (memo.nodes.length) {
		if (rows.length && !(rows[0] instanceof Node)) {
			rows = nodeFlatView(memo.nodes);
		}
	}

	model.view({
		rows: rows,
		nodes: memo.nodes,
		pivot: memo.pivot,
		columns: memo.columns
	}, {
		source: context.source || 'view.pipe',
		behavior: 'core'
	});

	next(memo);
}