import * as LIVR from 'livr';
import { customRules, aliasedRules } from './customRules';

export const { Validator } = LIVR;

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
		rules: { [key]: validationRules }
	};
}

export function hasRules(rules, key) {
	return toLIVR(rules, key).hasRules;
}

export function createValidator(rules, key) {
	if (arguments.length === 2) {
		const settings = toLIVR(rules, key);
		const validator = new Validator(settings.rules).registerRules(customRules);
		for (let rule in aliasedRules) {
			validator.registerAliasedRule(aliasedRules[rule]);
		}
		return validator;
	}

	return new Validator(rules);
}
