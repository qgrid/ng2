import { Injectable } from '@angular/core';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { isArray } from 'ng2-qgrid/core/utility/index';
import { Column, QueryBuilderService, ColumnMap } from '../query-builder.service';
import { createValidator } from 'ng2-qgrid/core/validation/validation.service';

export class Validator {
	private columnMap: ColumnMap;
	private rules = {
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
	};

	constructor(service: QueryBuilderService) {
		this.columnMap = service.columnMap();
	}

	for(key: string) {
		const column = this.columnMap[key];
		if (!column) {
			throw new AppError('validator', `Can't find column ${key}`);
		}

		const rules = this.rules;
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

			const key = column.type
			const rule = { [key]: rules[key] };
			const target = { [key]: value };

			const validator = createValidator(rule);
			const isValid = validator.validate(target);
			if (isValid) {
				return true;
			}

			const error =  validator.getErrors()[key];
			return isArray(error) ? error : [error];
		};
	}
}
