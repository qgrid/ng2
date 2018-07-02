import { Scene } from '../scene/scene';
import { Guard } from '../infrastructure/guard';
import { sortFactory } from '../row-list/row.list.sort';

export function viewPipe(memo, context, next) {
	Guard.hasProperty(memo, 'rows');
	Guard.hasProperty(memo, 'nodes');
	Guard.hasProperty(memo, 'pivot');
	Guard.hasProperty(memo, 'columns');

	const tag = {
		source: context.source || 'view.pipe',
		behavior: 'core'
	};

	const { model } = context;

	const scene = new Scene(model);
	let rows = scene.rows(memo);

	const { columns, nodes, pivot } = memo;
	const columnLine = scene.columnLine(columns);

	if (!model.sort().by.length) {
		const order = sortFactory(model);
		rows = order(rows);
	}

	model.view({
		rows,
		columns: columnLine.map(c => c.model),
		nodes,
		pivot
	}, tag);

	model.scene({
		rows,
		column: {
			rows: scene.columnRows(memo.columns),
			area: scene.columnArea(memo.columns),
			line: columnLine
		}
	}, tag);

	next(memo);
}