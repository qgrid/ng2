import AppError from  './error';
import {isUndefined, isFunction} from '../services/utility';

/**
 * If value is undefined exception will be thrown
 * @param {any} value - Value to check
 * @param {string} name - Argument name
 */
export function notUndefined(value, name){
	if (isUndefined(value)) {
		throw new AppError('guard.notUndefined', name);
	}
}


/**
 * If value is null or undefined exception will be thrown
 * @param {any} value - Value to check
 * @param {string} name - Argument name
 */
export function notNull(value, name){
	if (value === null || isUndefined(value)) {
		throw new AppError('guard.notNull', name);
	}
}

/**
 * If value is null or undefined or empty exception will be thrown
 * @param {any} value - Value to check
 * @param {string} name - Argument name
 */
export function notNullOrEmpty(value, name){
	if (value === null || isUndefined(value) || value === '') {
		throw new AppError('guard.notNullOrEmpty', name);
	}
}

/**
 * If value is not a function exception will be thrown
 * @param {any} value - Value to check
 * @param {string} name - Argument name
 */
export function invokable(value, name){
	if (!isFunction(value)) {
		throw new AppError('guard.invokable', name);
	}
}