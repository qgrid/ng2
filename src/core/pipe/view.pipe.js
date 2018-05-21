import { Scene } from '../scene/scene';
import { Guard } from '../infrastructure/guard';

export function viewPipe(memo, context, next) {
	Guard.hasProperty(memo, 'rows');
	Guard.hasProperty(memo, 'nodes');
	Guard.hasProperty(memo, 'pivot');
	Guard.hasProperty(memo, 'columns');

	const { model } = context;
	const scene = new Scene(model);

	const rows = scene.rows(memo);
	const columnLine = scene.columnLine(memo.columns);
	const tag = {
		source: context.source || 'view.pipe',
		behavior: 'core'
	};

	model.view({
		rows,
		columns: columnLine.map(c => c.model),
		nodes: memo.nodes,
		pivot: memo.pivot
	}, tag);

	model.scene({
		rows: rows,
		column: {
			rows: scene.columnRows(memo.columns),
			area: scene.columnArea(memo.columns),
			line: columnLine
		}
	}, tag);

	next(memo);
}