import { Injectable } from '@angular/core';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { isArray } from 'ng2-qgrid/core/utility/kit';
import { Column, QueryBuilderService, ColumnMap } from '../query-builder.service';
import { createValidator } from 'ng2-qgrid/core/validation/validation.service';

export class Validator {
	private columnMap: ColumnMap;
	private trueResult: Array<string> = [];
	private validators: { [key: string]: (value: any) => Array<string> } = {};
	private rules = {
		'bool': ['required'],
		'currency': ['required', 'decimal'],
		'date': ['required', 'iso_date'],
		'email': ['required' /*, 'email'*/],
		'file': ['required'],
		'id': ['required'],
		'image': ['required'],
		'number': ['required', 'decimal'],
		'password': ['required'],
		'url': ['required'/*, 'url'*/],
		'reference': ['required'],
		'text': ['required', 'string'],
		'time': ['required']
	};

	constructor(service: QueryBuilderService) {
		this.columnMap = service.columnMap();
	}

	for(key: string) {
		const validators = this.validators;
		if (validators.hasOwnProperty('key')) {
			return validators[key];
		}

		const column = this.columnMap[key];
		if (!column) {
			throw new AppError('validator', `Can't find column ${key}`);
		}

		const trueResult = this.trueResult;
		const id = column.type;
		const rule = this.rules[id];
		let validate = (value: any) => trueResult;
		if (rule) {
			const schema = { [id]: rule };
			validate = function test(value): Array<string> {
				if (isArray(value)) {
					const result = [];
					for (const item of value) {
						result.push(...test(item));
					}

					return result;
				}

				const target = { [id]: value };
				const validator = createValidator(schema);
				const isValid = validator.validate(target);
				if (isValid) {
					return trueResult;
				}

				const error = validator.getErrors()[id];
				return isArray(error) ? error : [error];
			};
		}

		validators[key] = validate;
		return validate;
	}
}
