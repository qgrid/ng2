import { Pipe } from '../pipe';

export const groupPipeUnit = [
	(memo, context, next) => {
		const { model } = context;
		const { nodes, rows } = model.view();
		next({ nodes, rows });
	},
	Pipe.pagination,
	(memo, context, next) => {
		const { model } = context;
		const tag = {
			source: context.source || 'group.pipe.unit',
			behavior: 'core'
		};

		const { rows } = memo;
		model.view({ rows }, tag);
		model.scene({ rows }, tag);

		next(memo);
	}
];