const swap = function (inst) {
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
	STRING: commonOperators.concat(textOperators),
	INTEGER: commonOperators.concat(numberOperators),
	NUMBER: commonOperators.concat(numberOperators),
	DATETIME: commonOperators.concat(numberOperators),
	CURRENCY: commonOperators.concat(numberOperators)
};

export const oneToOneMapping = {
	STRING: oneToOneCommonOperators.concat(textOperators),
	INTEGER: oneToOneCommonOperators.concat(oneToOneNumberOperators),
	NUMBER: oneToOneCommonOperators.concat(oneToOneNumberOperators),
	DATETIME: oneToOneCommonOperators.concat(oneToOneNumberOperators),
	CURRENCY: oneToOneCommonOperators.concat(oneToOneNumberOperators)
};

export const labelMapping = swap(camelCaseMapping);
