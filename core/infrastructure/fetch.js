import {isFunction, isUndefined} from '../utility';

export class Fetch {
	constructor(select) {
		this.select = select;
		this.busy = null;
		this.result = null;
	}

	run(item) {
		const select = this.select;

		this.result = null;
		let alive = true;
		this.busy = new Promise((resolveBusy, rejectBusy) => {
			const resolve = data => {
				if (alive) {
					this.result = data;
					resolveBusy(data);
				}
			};

			if (isFunction(select)) {
				const deferred = {
					resolve: resolve,
					reject: rejectBusy
				};

				const args = Array.from(arguments).slice(1) || [];
				const result = select(item, deferred, ...args);
				if (!isUndefined(result)) {
					if (isFunction(result.then)) {
						// when options.fetch returns promise
						result.then(resolve);
						if (isFunction(result.catch)) {
							result.catch(rejectBusy);
						}
					} else {
						// when options.fetch return result
						resolve(result);
					}
				}
				// when user should invoke d.resolve or d.reject
			}
			else {
				// when options.fetch is result itself
				resolve(select);
			}
		});

		return () => {
			this.busy = null;
			alive = false;
		};
	}
}