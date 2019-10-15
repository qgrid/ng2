import { sortFactory } from '../../row-list/row.list.sort';
import { Pipe } from '../pipe';

export const rowPipeUnit = [
	(_, context, next) => {
		const { model } = context;
		const order = sortFactory(model);
		const rows = order(model.view().rows);
		const memo = {
			rows,
			pivot: model.view().pivot,
			nodes: model.view().nodes
		};
		next(memo);
	},
	Pipe.animation,
	({ rows }, context, next) => {
		const { model } = context;
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