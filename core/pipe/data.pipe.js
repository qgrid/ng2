export function dataPipe(data, context, next) {
	const model = context.model;
	const result = data.length ? data : model.data().rows;
	if (result.length) {
		model.data({rows: result}, {source: 'data.pipe', behavior: 'core'});
	}

	next(result);
}