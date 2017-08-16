export function memoPipe(data, context, next) {
	next({
		rows: data,
		pivot: {heads: [], rows: []},
		nodes: []
	});
}