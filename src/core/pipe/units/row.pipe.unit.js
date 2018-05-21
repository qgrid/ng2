import { Scene } from '../../scene/scene';

export const rowPipeUnit = [
	(memo, context, next) => {
		const tag = {
			source: context.source || 'row.pipe.unit',
			behavior: 'core'
		};

		const { model } = context;
		const scene = new Scene(model);

		const rows = scene.rows(memo);
		model.view({ rows }, tag);
		model.scene({ rows }, tag);

		next(memo);
	}
];