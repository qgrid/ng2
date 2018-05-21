import { Guard } from '../infrastructure/guard';

export function memoPipe(data, context, next) {
	Guard.notNull(data, 'data');

	next({
		rows: data,
		pivot: { heads: [], rows: [] },
		nodes: []
	});
}