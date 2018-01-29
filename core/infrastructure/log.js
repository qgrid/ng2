/*eslint-disable  no-console*/

export class Log {
	constructor() {
	}

	static info(/*source, message*/) {
		// console.info(`qgrid.${source}: ${message}`);
	}

	static warn(/*source, message*/) {
		// console.warn(`qgrid.${source}: ${message}`);
	}

	static error(source, message) {
		console.error(`qgrid.${source}: ${message}`);
	}
}

/*eslint-enable*/