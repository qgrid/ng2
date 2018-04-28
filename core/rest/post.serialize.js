export function serialize(model) {
	const paginationState = model.pagination();
	const sortState = model.sort();
	const filterState = model.filter();

	return {
		filter: filterState.by,
		order: sortState.by.map(s => {
			const key = Object.keys(s)[0];
			const value = s[key];
			return (value === 'asc' ? '+' : '-') + key;
		}),
		skip: paginationState.current * paginationState.size,
		take: paginationState.size
	};
}
