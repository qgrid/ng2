import {flatView} from '../../node/node.service';

export const groupPipeUnit = [
	(memo, context, next) => {
		const tag = {
			source: context.source || 'group.pipe.unit',
			behavior: 'core'
		};

		const model = context.model;
		const nodes = model.view().nodes;
		const rows = flatView(nodes);
		model.view({rows: rows}, tag);
		model.scene({rows: rows}, tag);

		next(memo);
	}
];