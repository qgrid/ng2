export default function pipeGroup(data, ctx, next) {
	next({
		rows: data,
		pivot: {heads: [], rows: []},
		nodes: []
	});
}
