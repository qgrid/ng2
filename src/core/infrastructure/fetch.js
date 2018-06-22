import { isFunction, isUndefined } from '../utility/kit';

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
					this.invoke(result, resolve, rejectBusy);
				}
				// when user should invoke d.resolve or d.reject
			}
			else {
				this.invoke(select, resolve, rejectBusy);
			}
		});

		return () => {
			this.busy = null;
			alive = false;
		};
	}

	invoke(instance, resolve, reject) {
		if (instance && isFunction(instance.then)) {
			// when options.fetch returns promise
			instance.then(resolve);
			if (isFunction(instance.catch)) {
				instance.catch(reject);
			}
		} else if (instance && isFunction(instance.subscribe)) {
			// when options.fetch returns observable
			let isProcessed = false;
			let subscription;
			subscription = instance.subscribe(
				(...args) => {
					resolve(...args);
					isProcessed = true;
					if (subscription && isFunction(subscription.unsubscribe)) {
						// when async
						subscription.unsubscribe(); 
						subscription = null;
					}
				},
				reject
			);

			if (isProcessed) {
				if (subscription && isFunction(subscription.unsubscribe)) {
					// when sync
					subscription.unsubscribe();
					subscription = null;
				}
			}
		} else {
			// when options.fetch return result
			resolve(instance);
		}
	}
}