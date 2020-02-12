import { Pipe } from '../pipe';

export const groupPipeUnit = [
	(_, context, next) => {
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
		model.scene({ rows }, tag);

		next(memo);
	}
];

groupPipeUnit.why = 'redraw';