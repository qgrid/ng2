import { AppError, Defer } from '../infrastructure';
import { isFunction } from '../utility';

export function jobLine(delay) {
	let timeout = null;
	let defer = null;
	const cancel = () => {
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}

		if (defer) {
			defer.reject();
			defer = null;
		}
	};

	return job => {
		cancel();
		if (!isFunction(job)) {
			throw new AppError('job.line', 'job is not invokable');
		}

		const doJob = () => {
			job();

			defer.resolve();
			clearTimeout(timeout);
			
			defer = null;
			timeout = null;
		};

		timeout = setTimeout(doJob, delay);
		defer = new Defer();
		return defer.promise;
	};
}