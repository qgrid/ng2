import {Pipe} from '../pipe';

export const columnPipeUnit = [
	(memo, context, next) => {
		const view = context.model.view();
		next({
			rows: view.rows,
			pivot: view.pivot,
			nodes: view.nodes
		});
	},
	Pipe.column,
	(memo, context, next) => {
		context.model.view({
			columns: memo.columns
		}, {
			source: context.source || 'column.pipe.unit'
		});

		next(memo);
	}
];