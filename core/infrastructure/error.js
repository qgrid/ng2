import {isFunction} from '../utility';

export class AppError extends Error {
	constructor(name, message) {
		super(message);
		this.name = this.constructor.name;
		this.message = `qgrid.${name}: ${message}`;
		if (isFunction(Error.captureStackTrace)) {
			Error.captureStackTrace(this, this.constructor);
		} else {
			this.stack = (new Error(message)).stack;
		}
	}
}