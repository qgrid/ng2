import {flatView} from '../../row-details/row.details.service';

export const rowDetailsPipeUnit = [
	(memo, context, next) => {
		const tag = {
			source: context.source || 'row.details.pipe.unit',
			behavior: 'core'
		};

		const model = context.model;
		const mode = model.row().mode;
		const rows = flatView(model, mode);
		model.view({rows}, tag);
		model.scene({rows}, tag);

		next(memo);
	}
];