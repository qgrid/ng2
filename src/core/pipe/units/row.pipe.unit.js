import { sortFactory } from '../../row-list/row.list.sort';

export const rowPipeUnit = [
	(_, context, next) => {
		const tag = {
			source: context.source || 'row.pipe.unit',
			behavior: 'core'
		};

		const { model } = context;
		const order = sortFactory(model);
		const rows = order(model.view().rows);
		model.view({ rows }, tag);
		model.scene({ rows }, tag);

		next(rows);
	}
];

rowPipeUnit.why = 'redraw';