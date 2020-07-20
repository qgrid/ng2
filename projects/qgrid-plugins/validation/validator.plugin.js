import { isString, same } from '@qgrid/core/utility/kit';
import { hasRules, createValidator } from '@qgrid/core/validation/validation.service';

export class ValidatorPlugin {
	constructor(model, context) {
		this.model = model;
		this.context = context;

		this.oldErrors = [];
		if (hasRules(this.rules, this.key)) {
			this.validator = createValidator(this.rules, this.key);
		}
	}

	get errors() {
		if (this.validator) {
			const target = {
				[this.key]: this.value
			};

			const isValid = this.validator.validate(target);
			if (!isValid) {
				const newError = this.validator.getErrors()[this.key];
				const newErrors = isString(newError) ? [newError] : newError;
				if (!same(newErrors, this.oldErrors)) {
					this.oldErrors = newErrors;
				}
			} else {
				this.oldErrors.length = 0;
			}

			return this.stringify(this.oldErrors);
		}
	}

	get rules() {
		return this.model.validation().rules;
	}

	get type() {
		return this.context.type;
	}

	get value() {
		return this.context.value;
	}

	get key() {
		return this.context.key;
	}

	stringify(errors) {
		const customErrors = [];
		let rules = {};
		for (const rule of this.validator.livrRules[this.key]) {
			rules = Object.assign(rules, rule);
		}

		for (const error of errors) {
			switch (error) {
				case 'REQUIRED': { customErrors.push(`Can't be empty`); break; }
				case 'FORMAT_ERROR': { customErrors.push('Wrong format'); break; }
				case 'TOO_LOW': { customErrors.push(`Must be > ${rules.min_number}`); break; }
				case 'TOO_HIGH': { customErrors.push(`Must be < ${rules.max_number}`); break; }
				case 'CANNOT BE EMPTY': { customErrors.push(`Can't be empty`); break; }
				case 'WRONG_FORMAT': { customErrors.push('Must match the pattern'); break; }
				case 'WRONG_EMAIL': { customErrors.push('Must be an email'); break; }
				case 'WRONG_URL': { customErrors.push('Must be a url'); break; }
				case 'WRONG_DATE': { customErrors.push('Must be a date'); break; }
				case 'FIELDS_NOT_EQUAL': { customErrors.push(`Field must be equal ${rules.equal_to_field}`); break; }
				case 'NOT_INTEGER': { customErrors.push('Must be an integer'); break; }
				case 'NOT_POSITIVE_INTEGER': { customErrors.push('Must be a positive integer'); break; }
				case 'NOT_DECIMAL': { customErrors.push('Must be a decimal'); break; }
				case 'NOT_POSITIVE_DECIMAL': { customErrors.push('Must be a positive decimal'); break; }
				case 'NOT_ALLOWED_VALUE': {
					if (rules.eq && rules.eq != this.value) {
						customErrors.push(`Must be equal to ${rules.eq}`);
					}
					else {
						customErrors.push(`Must be one of ${rules.one_of}`);
					}
					break;
				}
				case 'TOO_LONG': {
					if (rules.max_length && rules.max_length < this.value.length) {
						customErrors.push(`Length must be < ${rules.max_length}`);
					}
					else if (rules.length_equal && rules.length_equal != this.value.length) {
						customErrors.push(`Length must be equal to ${rules.length_equal}`);
					}
					else {
						customErrors.push(`Length must be [${rules.length_between['0']},${rules.length_between['1']}]`);
					}
					break;
				}
				case 'TOO_SHORT': {
					if (rules.min_length && rules.min_length > this.value.length) {
						customErrors.push(`Length must be > ${rules.min_length}`);
					}
					else if (rules.length_equal && rules.length_equal != this.value.length) {
						customErrors.push(`Length must be equal to ${rules.length_equal}`);
					}
					else {
						customErrors.push(`Length must be [${rules.length_between['0']},${rules.length_between['1']}]`);
					}
					break;
				}
				default: customErrors.push(error);
			}
		}

		return customErrors;
	}
}
