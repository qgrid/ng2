/*eslint-disable  no-console, no-unused-vars, no-undef*/

export class Log {
	constructor() {
	}

	static info(source, message) {
		if (ENV.indexOf('prod') < 0) {
			console.info(`qgrid.${source}: ${message}`);
		}
	}

	static warn(source, message) {
		console.warn(`qgrid.${source}: ${message}`);
	}

	static error(source, message) {
		console.error(`qgrid.${source}: ${message}`);
	}
}

/*eslint-enable*/
