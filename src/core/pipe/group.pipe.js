import {map as getColumnMap} from '../column/column.service';
import {nodeBuilder} from '../node';

export function groupPipe(memo, context, next) {
	const model = context.model;
	const dataState = model.data();
	const groupState = model.group();

	const build = nodeBuilder(
		getColumnMap(dataState.columns),
		groupState.by,
		context.valueFactory
	);

	memo.nodes = build(memo.rows);
	next(memo);
}