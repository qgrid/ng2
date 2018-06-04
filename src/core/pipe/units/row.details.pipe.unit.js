import { flatView } from '../../row-details/row.details.service';

export const rowDetailsPipeUnit = [
	(_, context, next) => {
		const tag = {
			source: context.source || 'row.details.pipe.unit',
			behavior: 'core'
		};

		const { model } = context;
		const { mode } = model.row();
		const rows = flatView(model, mode);
		model.view({ rows }, tag);
		model.scene({ rows }, tag);

		next(rows);
	}
];

rowDetailsPipeUnit.why = 'redraw';