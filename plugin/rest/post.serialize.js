export function serialize(model) {
	const pagination = model.pagination();
	const sort = model.sort();
	const filter = model.filter();

	return {
		filter: filter.by.items,
		order: sort.by.map(s => {
			const key = Object.keys(s)[0];
			const value = s[key];
			return (value === 'asc' ? '+' : '-') + key;
		}),
		skip: pagination.current * pagination.size,
		take: pagination.size
	};
}
