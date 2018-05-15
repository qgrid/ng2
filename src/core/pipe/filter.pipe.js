export function filterPipe(data, context, next) {
	const result = [];
	if (data.length) {
		const model = context.model;
		const filterState = model.filter();
		const test = filterState.match(context);

		for (let i = 0, length = data.length; i < length; i++) {
			const item = data[i];
			if (test(item)) {
				result.push(item);
			}
		}
	}

	next(result);
}