import {Pipe} from '../pipe';
import {Scene} from '../../scene';

export const columnPipeUnit = [
	(memo, context, next) => {
		const view = context.model.view();
		next({
			rows: view.rows,
			pivot: view.pivot,
			nodes: view.nodes
		});
	},
	Pipe.column,
	(memo, context, next) => {
		const model = context.model;
		const scene = new Scene(model);
		const columnLine = scene.columnLine(memo.columns);
		const tag = {
			source: context.source || 'column.pipe.unit',
			behavior: 'core'
		};

		const columns = columnLine.map(c => c.model);
		model.view({columns: columns}, tag);

		const column = {
			rows: scene.columnRows(memo.columns),
			area: scene.columnArea(memo.columns),
			line: columnLine
		};

		context.model.scene({column: column}, tag);

		next(memo);
	}
];