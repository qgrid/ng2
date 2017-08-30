import {AppError} from '../infrastructure';
import {isFunction} from '../utility';

export function jobLine(delay) {
	let timeout = null;
	const cancel = () => {
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}
	};

	return job => {
		cancel();
		if (!isFunction(job)) {
			throw new AppError('job.line', 'job is not invokable');
		}

		const doJob = () => {
			job();
			timeout = null;
		};

		timeout = setTimeout(doJob, delay);
	};
}