import { Injectable } from '@angular/core';
import { isArray } from 'ng2-qgrid/core/utility/index';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { QueryBuilderService } from '../query-builder.service';

function traverse(list, test) {
	return list.reduce((memo, item) => {
		const result = test(item);
		if (!result) {
			memo.push(false);
		}
		return memo;
	}, []);
}

@Injectable()
export class ValidatorService {
	constructor(private service: QueryBuilderService) {
	}

	factory(validator) {
		const commonValidator = validator.create({
			required: value =>
				isArray(value)
					? value.length > 0
					: value === 0 || value
		});

		const numberValidator = commonValidator
			.build(['required'])
			.register('number', function test(value) {
				if (isArray(value)) {
					const state = traverse(value, test);
					return state.length === 0;
				}
				else {
					const number = parseFloat(value);
					return !isNaN(number) && isFinite(number);
				}
			});

		const integerValidator = commonValidator
			.build(['required'])
			.register('integer', function test(value) {
				if (isArray(value)) {
					const state = traverse(value, test);
					return state.length === 0;
				}
				else {
					const number = parseInt(value);
					return !isNaN(number) && isFinite(number);
				}
			});

		const datetimeValidator = commonValidator
			.build(['required'])
			.register('datetime', function test(value) {
				if (isArray(value)) {
					const state = traverse(value, test);
					return state.length === 0;
				}
				else {
					const date = new Date(value) as any;
					return date !== 'Invalid Date' && !isNaN(date);
				}
			});

		const currencyValidator = commonValidator
			.build(['required']);

		const stringValidator = commonValidator
			.build(['required']);

		const validators = {
			'number': numberValidator,
			'integer': integerValidator,
			'currency': currencyValidator,
			'datetime': datetimeValidator,
			'string': stringValidator
		};

		const columnMap = this.service.columnMap();
		const types = Object
			.keys(this.service.columnMap())
			.reduce((memo, key) => {
				memo[key] = columnMap[key].type;
				return memo;
			}, {});

		return key => {
			if (!types.hasOwnProperty(key)) {
				throw new AppError(
					'validator.factory',
					`Invalid key ${key}`
				);
			}

			const type = (types[key] || '').toLowerCase();
			if (!validators.hasOwnProperty(type)) {
				throw new AppError(
					'validator.factory',
					`No rules registered for type ${type}`
				);
			}

			return validators[type];
		};
	}