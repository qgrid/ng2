import * as LIVR from 'livr';
import { Fetch } from '../infrastructure/fetch';

export const { Validator: LivrValidator } = LIVR;

export function createValidator(rules) {
	return new LivrValidator(rules);
}

export class ValidatorBuilder {
	constructor(rules, key) {
		this.validator = null;
		this.hasCommonRules = false;
		this.hasCustomRules = false;
		this.fetch = this.fetchFactory();

		this.registerRules(rules, key);
	}

	registerRules(srcRules, key) {
		const rules = [];
		const keyRules = srcRules.filter(r => r.key === key);
		keyRules.forEach(rule => {
			for (let name of Object.keys(rule)) {
				if (name === 'test') {
					this.customRule = {[key]: rule[name]};
					this.hasCustomRules = true;
				}
				if (!['for', 'key'].includes(name)) {
					rules.push({
						[name]: rule[name]
					});
				}
			}
		});

		this.hasCommonRules = rules.length > 0;
		const livrRules = this.hasCommonRules ? {[key]: rules} : {};
		this.validator = new LivrValidator(livrRules);
		if (this.hasCustomRules) {
			this.validator.registerRules({
				test:() => this.customRule[key]
			})
		}
	}

	fetchFactory() {
		return new Fetch(this.validator);
	}

	get hasRules() {
		return this.hasCommonRules || this.hasCustomRules;
	}

}
