export function paginationPipe(data, context, next) {
	const model = context.model;
	if (model.scroll().mode !== 'virtual') {
		const paginationState = model.pagination();
		const size = paginationState.size;
		const current = paginationState.current;
		const start = current * size;

		model.pagination({count: data.length}, {source: 'pagination.pipe', behavior: 'core'});
		next(data.slice(start, start + size));
	}
	else {
		next(data);
	}
}