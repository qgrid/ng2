import { AppError, Defer } from '../infrastructure';
import { isFunction } from '../utility';

export function jobLine(delay) {
	let cancellationToken = null;
	let defer = null;
	const cancel = () => {
		if (cancellationToken) {
			jobLine.clear(cancellationToken);
			cancellationToken = null;
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
			jobLine.clear(cancellationToken);
			
			defer = null;
			cancellationToken = null;
		};

		cancellationToken = jobLine.run(doJob, delay);

		defer = new Defer();
		return defer.promise;
	};
}

jobLine.run = setTimeout;
jobLine.clear = clearTimeout;