/*eslint-disable  no-console, no-unused-vars, no-undef*/

const ENV = window.ENV || {};

function info(source, message) {
	console.info(`qgrid.${source}: ${message}`);
}

export class Log {
	constructor() {
	}

	static warn(source, message) {
		console.warn(`qgrid.${source}: ${message}`);
	}

	static error(source, message) {
		console.error(`qgrid.${source}: ${message}`);
	}
}

/*eslint-enable*/

Log.info = (window.ENV || 'production').indexOf('prod') < 0 ? () => { } : info;