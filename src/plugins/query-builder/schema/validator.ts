import { Injectable } from '@angular/core';
import { isArray } from 'ng2-qgrid/core/utility/index';
import { Column } from '../query-builder.service';
import { createValidator } from 'ng2-qgrid/core/validation/validation.service';

export class Validator {
	private validator = createValidator({
		'bool': ['required'],
		'currency': ['required', 'decimal'],
		'date': ['required', 'iso_date'],
		'email': ['required', 'email'],
		'file': ['required'],
		'id': ['required'],
		'image': ['required'],
		'number': ['required', 'decimal'],
		'password': ['required'],
		'url': ['required', 'url'],
		'reference': ['required'],
		'text': ['required', 'string'],
		'time': ['required']
	});

	constructor() {
	}

	for(column: Column) {
		const validator = this.validator;
		return function test(value): boolean | Array<string> {
			if (isArray(value)) {
				const result = [];
				for (const item of value) {
					const effect = !test(item) as any;
					if (effect !== true) {
						result.push(...effect);
					}
				}

				return result.length ? result : true;
			}

			const inst = { [column.type]: value };
			const isValid = validator.validate(inst);
			if (isValid) {
				return true;
			}

			return validator.getErrors();
		};
	}
}
