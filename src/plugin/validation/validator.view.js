import { isString, isEqual } from '../../core/utility/kit';
import { hasRules, createValidator } from '../../core/validation/validation.service';

export class ValidatorView {
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
				if (!isEqual(newErrors, this.oldErrors)) {
					this.oldErrors = newErrors;
				}
			} else {
				this.oldErrors.length = 0;
			}

			return this.oldErrors;
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
}
