export function memoPipe(data, ctx, next) {
	next({
		rows: data,
		pivot: {heads: [], rows: []},
		nodes: []
	});
}