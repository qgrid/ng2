export function dataPipe(data, context, next) {
	const model = context.model;
	model.data({rows: data}, {source: 'data.pipe', behavior: 'core'});
	next(data);
}