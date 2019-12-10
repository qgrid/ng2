import * as LIVR from "livr";

export const {Validator: LivrValidator} = LIVR;


export function createLivrValidator(rules) {
	return new LivrValidator(rules);
}

export class ValidatorBuilder {
	constructor(rules, key) {
		this.rules = rules;
		this.livrRules = null;
		this.errors = null;
		this.livrValidator = null;
		this.hasLivrRules = false;
		this.hasCustomRules = false;

		this.registerRules(rules, key);
	}

	registerRules(rules, key) {
		const livrRules = [];
		const keyRules = rules.filter(r => r.key === key);
		keyRules.forEach(rule => {
			for (let name of Object.keys(rule)) {
				if (name === 'customValidation') {
					this.customRule = {[key]: rule[name]};
					this.hasCustomRules = !!this.customRule;
				} else if (!['for', 'key'].includes(name)) {
					livrRules.push({
						[name]: rule[name]
					});
				}
			}
		});

		this.hasLivrRules = livrRules.length > 0;
		if (this.hasLivrRules) {
			this.livrRules = {[key]: livrRules};
			this.livrValidator = new LivrValidator({[key]: livrRules});
		}
	}

	get hasRules() {
		return this.hasLivrRules || this.hasCustomRules;
	}

	validate(data) {
		let isValid = true;

		if (this.hasLivrRules) {
			isValid = this.livrValidator.validate(data);
			if (!isValid) {
				this.errors = this.livrValidator.getErrors();
			}
		}

		if (this.hasCustomRules) {
			Object.keys(data)
				.forEach(k => {
					const isValidCustom = this.customRule[k].validationFunction(data[k]);
					if (!isValidCustom) {
						this.errors = this.errors || {};
						// this.errors[k] = 'CUSTOM_ERROR';
						this.errors[k] = this.customRule[k].validationMessage;
					}

					isValid = isValid && isValidCustom;
				});
		}

		return isValid;
	}

	getErrors() {
		return this.errors;
	}


}
