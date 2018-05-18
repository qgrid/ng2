function swap(inst: { [key: string]: string }): { [key: string]: string } {
	const result = {};
	for (const prop in inst) {
		if (inst.hasOwnProperty(prop)) {
			result[inst[prop]] = prop;
		}
	}

	return result;
};

const commonOperators = [
	'EQUALS',
	'NOT EQUALS',
	'IN',
	'IS EMPTY',
	'IS NOT EMPTY'
];

const oneToOneCommonOperators = [
	'EQUALS',
	'NOT EQUALS'
];

const textOperators = [
	'LIKE',
	'NOT LIKE',
	'STARTS WITH',
	'ENDS WITH'
];

const numberOperators = [
	'BETWEEN',
	'GREATER THAN',
	'LESS THAN',
	'GREATER OR EQ. TO',
	'LESS OR EQ. TO'
];

const oneToOneNumberOperators = [
	'GREATER THAN',
	'LESS THAN',
	'GREATER OR EQ. TO',
	'LESS OR EQ. TO'
];

export const camelCaseMapping = {
	'IS EMPTY': 'isNull',
	'IS NOT EMPTY': 'isNotNull',
	'EQUALS': 'equals',
	'NOT EQUALS': 'notEquals',
	'GREATER OR EQ. TO': 'greaterThanOrEquals',
	'LESS OR EQ. TO': 'lessThanOrEquals',
	'GREATER THAN': 'greaterThan',
	'LESS THAN': 'lessThan',
	'LIKE': 'like',
	'NOT LIKE': 'notLike',
	'STARTS WITH': 'startsWith',
	'ENDS WITH': 'endsWith',
	'IN': 'in',
	'BETWEEN': 'between'
};

export const typeMapping = {
	bool: oneToOneCommonOperators,
	id: commonOperators.concat(textOperators),
	text: commonOperators.concat(textOperators),
	email: commonOperators.concat(textOperators),
	url: commonOperators.concat(textOperators),
	password: commonOperators.concat(textOperators),
	number: commonOperators.concat(numberOperators),
	date: commonOperators.concat(numberOperators),
	time: commonOperators.concat(numberOperators),
	currency: commonOperators.concat(numberOperators)
};

export const oneToOneMapping = {
	bool: oneToOneCommonOperators,
	id: oneToOneCommonOperators.concat(textOperators),
	text: oneToOneCommonOperators.concat(textOperators),
	email: oneToOneCommonOperators.concat(textOperators),
	url: oneToOneCommonOperators.concat(textOperators),
	password: oneToOneCommonOperators.concat(textOperators),
	number: oneToOneCommonOperators.concat(oneToOneNumberOperators),
	date: oneToOneCommonOperators.concat(oneToOneNumberOperators),
	time: oneToOneCommonOperators.concat(oneToOneNumberOperators),
	currency: oneToOneCommonOperators.concat(oneToOneNumberOperators)
};

export const labelMapping = swap(camelCaseMapping);
