import columnPipe from '../column.pipe';

export default [
	(memo, context, next) => {
		const view = context.model.view();
		next({
			rows: view.rows,
			pivot: view.pivot,
			nodes: view.nodes
		});
	},
	columnPipe,
	(memo, context, next) => {
		context.model.view({
			columns: memo.columns
		});

		next(memo);
	}
];