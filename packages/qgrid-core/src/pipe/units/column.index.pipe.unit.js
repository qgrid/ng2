import { Pipe } from '../pipe';
import { Scene } from '../../scene/scene';

export const columnIndexPipeUnit = [
	(_, context, next) => {
		const { index } = context.model.columnList();
		next(index);
	},
	Pipe.columnIndex,
	Pipe.animation,
	(memo, context, next) => {
		const { model } = context;
		const scene = new Scene(model);
		const columnLine = scene.columnLine(memo.columns);
		const tag = {
			source: context.source || 'column.pipe.unit',
			behavior: 'core'
		};

		model.view({
			columns: columnLine.map(c => c.model)
		}, tag);

		model.scene({
			column: {
				rows: scene.columnRows(memo.columns),
				area: scene.columnArea(memo.columns),
				line: columnLine
			}
		}, tag);

		next(memo);
	}
];

columnIndexPipeUnit.why = 'redraw';