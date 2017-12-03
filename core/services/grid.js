import {build as buildPipe} from '../pipe/pipe.build';
import {Log} from '../infrastructure';
import {noop} from '../utility';
import {guid} from './guid';
import {PersistenceService} from '../persistence/persistence.service';

export class GridService {
	constructor(model, start = () => noop) {
		this.model = model;
		this.start = start;
		this.tasks = [];
		this.state = new PersistenceService(model);
	}

	invalidate(source = 'invalidate', changes = {}, pipe = null) {
		const queue = this.tasks;
		const nextTask = () => {
			queue.shift();
			const job = queue[0];
			if (job) {
				job();
			}
		};

		return new Promise((resolve, reject) => {
			const task = () => {
				Log.info('grid', `run job ${source}`);
				const model = this.model;
				model.head().cache.clear();
				model.body().cache.clear();
				model.foot().cache.clear();

				const stop = this.start();
				const busy = this.busy();
				const run = buildPipe(model);
				const runNext = () => stop(busy).then(nextTask);

				return run(source, changes, pipe)
					.then(() => {
						resolve();
						runNext();
					})
					.catch(ex => {
						Log.error('grid', ex);

						reject();
						runNext();
					});
			};

			Log.info('grid', `add job ${source}`);
			queue.push(task);
			if (queue.length === 1) {
				task();
			}
		});
	}

	busy() {
		const id = guid();
		const progress = this.model.progress;
		progress({queue: progress().queue.concat([id])});
		return () => {
			const queue = Array.from(progress().queue);
			const index = queue.indexOf(id);
			if (index >= 0) {
				queue.splice(index, 1);
				progress({queue: queue});
			}
		};
	}
}