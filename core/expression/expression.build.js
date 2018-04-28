export function build(filterBy, op = 'and') {
	const result = [];
	for (let [key, filter] of Object.entries(filterBy)) {
		if (key === '$expression') {
			result.push(filter);
			continue;
		}

		if (filter.expression) {
			result.push(filter.expression);
		}

		const expressions = [];
		if (filter.items && filter.items.length) {
			expressions.push(toInExpression(key, filter.items));
		}

		if (filter.blanks) {
			expressions.push(toIsEmptyExpression(key));
		}

		if (expressions.length) {
			if (expressions.length === 1) {
				result.push(expressions[0]);
			}
			else {
				result.push(compile(expressions, 'or'));
			}
		}
	}

	return compile(result, op);
}

function toIsEmptyExpression(key) {
	return {
		kind: 'group',
		op: 'and',
		left: {
			kind: 'condition',
			left: key,
			op: 'isEmpty',
			right: null
		},
		right: null
	};
}

function toInExpression(key, items) {
	return {
		kind: 'group',
		op: 'and',
		left: {
			kind: 'condition',
			left: key,
			op: 'in',
			right: Array.from(items)

		},
		right: null
	};
}

function compile(expressions, op) {
	const root = {
		kind: 'group',
		op,
		left: null,
		right: null
	};

	let current = root;

	expressions.forEach(expr => {
		if (!current.left) {
			current.left = expr;
		}
		else {
			const next = {
				kind: 'group',
				op,
				left: expr,
				right: null
			};

			current.right = next;
			current = next;
		}
	});


	return root.left ? root : null;
}
