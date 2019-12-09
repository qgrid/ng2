import * as LIVR from 'livr';

export const {Validator} = LIVR;

function toLIVRFormat(rules, key) {
	const validationRules = [];
	const customRules = [];
	rules.forEach(rule => {
		if (rule.key === key) {
			for (let name of Object.keys(rule)) {
				if (!['for', 'key'].includes(key)) {
					const rulesArray = key === 'customFunction' ? customRules : validationRules;
					rulesArray.push({
						[name]: rule[name]
					});
				}
			}
		}
	});
	return {
		customRules: {[key]: customRules},
		rules: {[key]: validationRules},
		hasRules: validationRules.length + customRules.length > 0,
		hasLIVRRules: validationRules.length > 0,
	};
}

export function hasRules(rules, key) {
	return toLIVRFormat(rules, key).hasRules;
}

export function createValidator(rules, key) {
	if (rules && key) {
		const settings = toLIVRFormat(rules, key);
		return new Validator(settings.rules);
	}

	return new Validator(rules);
}
