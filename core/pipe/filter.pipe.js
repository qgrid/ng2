export function filterPipe(data, context, next) {
	const result = [];
	if (data.length) {
		const model = context.model;
		const filterState = model.filter();
		const match = filterState.match(context);

		for (let i = 0, length = data.length; i < length; i++) {
			const item = data[i];
			if (match(item)) {
				result.push(item);
			}
		}
	}

	next(result);
}