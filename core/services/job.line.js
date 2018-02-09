import { AppError, Defer } from '../infrastructure';
import { isFunction } from '../utility';
import { setTimeout, clearTimeout } from 'timers';

export function jobLine(delay) {
	let defer = null;
	const reset = () => {
		if (defer) {
			defer.reject();
			defer = null;
		}
	};

	return job => {
		reset();

		if (!isFunction(job)) {
			throw new AppError('job.line', 'job is not invokable');
		}

		const doJob = () => {
			job();

			defer.resolve();

			defer = null;
		};

		defer = jobLine.run(doJob, delay);
		return defer.promise;
	};
}

jobLine.run = (job, delay) => {
	const defer = new Defer();
	const token = setTimeout(job, delay);

	defer.promise.catch(() => clearTimeout(token));

	return defer;
};