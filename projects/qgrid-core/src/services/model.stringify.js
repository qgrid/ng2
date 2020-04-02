import {flatten} from '../utility/kit';

export function stringifyFactory(property) {
	switch (property) {
		case 'filter':
			return filter;
		case 'sort':
			return sort;
		case 'group':
		case 'pivot':
			return transformBy(property);
		default:
			return () => '';
	}
}

function filter(model) {
	const values = Object.values(model.by)
		.map(column => column.items);

	if (values.length === 0) return '';

	const by = flatten(values).join(', ');
	return `filter ${by}`;
}

function sort(model) {
	const keys = [];
	for (let item of model.by) {
		for (let key in item) {
			keys.push(key);
		}
	}

	if (keys.length === 0) return '';

	const by = keys.join(', ');
	return `sort ${by}`;
}

function transformBy(property) {
	return model => {
		const keys = model.by;
		if (keys.length === 0) return '';

		const by = keys.join(', ');
		return `${property} ${by}`;
	};
}