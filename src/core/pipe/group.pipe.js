import {map as getColumnMap} from 'core/column/column.service';
import nodeBuilder from 'core/node/node.builder';

export default function pipeGroup(memo, context, next) {
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