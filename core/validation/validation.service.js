import LIVR from 'livr';

function toLIVR(rules, key) {
	const validationRules = [];
	rules.forEach(rule => {
		if (rule.key === key) {
			for (let name of Object.keys(rule)) {
				if (name !== 'key' && name !== 'for') {
					validationRules.push({
						[name]: rule[name]
					});
				}
			}
		}
	});
	return {
		hasRules: validationRules.length > 0,
		rules: {[key]: validationRules}
	};
}

export function hasRules(rules, key) {
	return toLIVR(rules, key).hasRules;
}

export function createValidator(rules, key) {
	const settings = toLIVR(rules, key);
	return new LIVR.Validator(settings.rules);
}
