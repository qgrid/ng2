import {build as buildPipe} from '../pipe';
import {Log} from '../infrastructure';
import {noop} from '../services/utility';
import {guid} from '../services';
import {getFactory as valueFactory} from '../services/value';

export class GridService {
	constructor(model, apply = noop) {
		this.model = model;
		this.apply = apply;
	}

	invalidate(source = 'invalidate', changes = {}, pipe = null) {
		Log.info('invalidate', source);

		const model = this.model;
		model.head().cache.clear();
		model.body().cache.clear();
		model.foot().cache.clear();

		const cancelBusy = this.busy();
		const run = buildPipe(model, valueFactory);
		return run(source, changes, pipe)
			.then(this.apply)
			.then(cancelBusy)
			.catch(cancelBusy);
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