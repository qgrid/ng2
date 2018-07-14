import { flatten } from '../utility/kit';
import { Node } from '../node/node';

function injectData(schema, source, target) {
	return Object
		.keys(source)
		.filter(key => !schema.hasOwnProperty(key))
		.reduce((memo, key) => {
			memo[key] = source[key];
			return memo;
		}, target);
}

function expandData(schema, source) {
	const baseline =
		Object.keys(schema)
			.map(key => {
				const node = schema[key];
				return source && source.hasOwnProperty(key)
					? expandData(node, source[key])
					: expandData(node);
			});

	return baseline.length
		? flatten(baseline, true)
		: [source];
}

function liftSchema(schema) {
	const baseline = [];

	function lift(schema, depth) {
		const derivatives =
			schema
				? Object.keys(schema)
					.map(key => {
						const node = schema[key];
						return {
							key: key,
							value: lift(node, depth + 1)
						};
					})
				: [];

		if (derivatives.length > 0)
			if (!baseline[depth]) {
				baseline[depth] = derivatives;
			}
			else {
				baseline[depth].push(...derivatives);
			}

		return (derivatives.length && derivatives.reduce((memo, d) => memo + d.value, 0)) || 1;
	}

	lift(schema, 0);
	return baseline;
}

function sortSchema(schema, comparator) {
	return Object
		.keys(schema)
		.sort(comparator)
		.reduce((memo, key) => {
			memo[key] = sortSchema(schema[key], comparator);
			return memo;
		}, {});
}


function reduceSchema(schema) {
	const baseline = [];

	function lift(schema, node) {
		if (schema) {
			Object
				.keys(schema)
				.forEach(key => {
					const child = new Node(key, node.level + 1);
					node.children.push(child);
					lift(schema[key], child);
					return child;
				})
		}

		return node;
	}

	return lift(schema, new Node('$root', 0));
}

export function pivotForm(source, comparator) {
	if (source.schema && source.data) {
		const schema = sortSchema(source.schema, comparator);
		const rows = source.data.map(row => injectData(schema, row, expandData(schema, row)));
		const head = reduceSchema(schema);
		return { head, rows };
	}

	return { head: new Node('$root', 0), rows: [] };
}