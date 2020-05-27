import { sortFactory } from '../../row-list/row.list.sort';
import { Pipe } from '../pipe';

export const rowPipeUnit = [
	(_, context, next) => {
		const { model } = context;
		const { rows, pivot, nodes } = model.view();
		const order = sortFactory(model);
		const memo = {
			rows: order(rows),
			pivot,
			nodes,
		};

		next(memo);
	},
	Pipe.animation,
	(memo, context, next) => {
		const { model } = context;
		const { rows } = memo;

		const tag = {
			source: context.source || 'row.pipe.unit',
			behavior: 'core'
		};

		model.view({ rows }, tag);
		model.scene({ rows }, tag);

		next(rows);
	}
];

rowPipeUnit.why = 'redraw';