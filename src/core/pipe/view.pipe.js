import {flatView as nodeFlatView} from '../node';

export function viewPipe(memo, context, next) {
	const model = context.model;
	const rows = memo.nodes.length ? nodeFlatView(memo.nodes) : memo.rows;

	model.view({
		rows: rows,
		nodes: memo.nodes,
		pivot: memo.pivot,
		columns: memo.columns
	}, {
		source: 'view.pipe',
		behavior: 'core'
	});

	next(memo);
}