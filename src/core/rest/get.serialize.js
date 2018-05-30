export function serialize(model) {
	const paginationState = model.pagination();
	const sortState = model.sort();
	const filterState = model.filter();

	return {
		order: sortState.by
			.map(item => {
				const field = Object.keys(item)[0];
				const order = item[field];
				return `${order === 'asc' ? '+' : '-'}${field}`;
			})
			.join(','),
		filter: Object
			.keys(filterState.by)
			.map(field => {
				const state = filterState.by[field];
				if(field === '$expression') {
					return `$expression=where:${state}`;
				}

				if (state.items) {
					return `${field}=in:${state.items.join(',')}`;
				}

				if (state.expression) {
					return `${field}=where:${state.expression}`;
				}

				return '';
			})
			.filter(part => !!part)
			.join(';'),
		skip: paginationState.current * paginationState.size,
		take: paginationState.size
	};
}
