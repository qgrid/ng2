import { Defer } from '../infrastructure/defer';
import { AppError } from '../infrastructure/error';
import { isFunction } from '../utility/kit';
import { Fastdom } from './fastdom';

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
			throw new AppError('job.line', 'job is not invocable');
		}

		const doJob = () => {
			if (defer) {
				job();
				defer.resolve();
				defer = null;
			}
		};

		defer = jobLine.run(doJob, delay);
		return defer.promise;
	};
}

jobLine.run = (job, delay) => {
	const defer = new Defer();

	const token = Fastdom.invoke(() => setTimeout(job, delay));
	defer.promise.catch(() => clearTimeout(token));

	return defer;
};