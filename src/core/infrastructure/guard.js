import { AppError } from './error';
import { isUndefined, isFunction } from '../utility/kit';

const hasOwnProperty = Object.prototype.hasOwnProperty;

export class Guard {
	/**
	 * If value is undefined exception will be thrown
	 * @param {any} value - Value to check
	 * @param {string} name - Argument name
	 */
	static notUndefined(value, name) {
		if (isUndefined(value)) {
			throw new AppError('guard.notUndefined', name);
		}
	}


	/**
	 * If value is null or undefined exception will be thrown
	 * @param {any} value - Value to check
	 * @param {string} name - Argument name
	 */
	static notNull(value, name) {
		if (value === null || isUndefined(value)) {
			throw new AppError('guard.notNull', name);
		}
	}

	/**
	 * If value is null or undefined or empty exception will be thrown
	 * @param {any} value - Value to check
	 * @param {string} name - Argument name
	 */
	static notNullOrEmpty(value, name) {
		if (value === null || isUndefined(value) || value === '') {
			throw new AppError('guard.notNullOrEmpty', name);
		}
	}

	/**
	 * If value is not a function exception will be thrown
	 * @param {any} value - Value to check
	 * @param {string} name - Argument name
	 */
	static invokable(value, name) {
		if (!isFunction(value)) {
			throw new AppError('guard.invokable', name);
		}
	}
	
	static hasProperty(instance, name) {
		Guard.notNull(instance, 'instance');
		if (!hasOwnProperty.call(instance, name)) {
			throw new AppError('guard.hasProperty', name);
		}
	}
}