export function serialize(model) {
	const pagination = model.pagination();
	const sorting = model.sort();
	const filter = model.filter();

	return {
		order: sorting.by
			.map(item => {
				const field = Object.keys(item)[0];
				const order = item[field];
				return `${order === 'asc' ? '+' : '-'}${field}`;
			})
			.join(','),
		filter: Object.keys(filter.by).map(field => {
			return `${field}=in:${filter.by[field].items.join(',')}`;
		}).join(';'),
		skip: pagination.current * pagination.size,
		take: pagination.size
	};
}
