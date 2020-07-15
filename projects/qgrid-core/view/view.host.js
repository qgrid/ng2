import { jobLine } from '../services/job.line';
import { PipeUnit } from '../pipe/pipe.unit';
import {
	GRID_INVALIDATE_COMMAND_KEY,
	STYLE_INVALIDATE_COMMAND_KEY,
	VISIBILITY_CHECK_COMMAND_KEY
} from '../command-bag/command.bag';

export class ViewHost {
	constructor(plugin) {
		this.plugin = plugin;

		const { model, observeReply, observe, commandPalette } = this.plugin;
		const { triggers } = model.pipe();
		const { pipe } = model.data();

		const visibilityCheck = commandPalette.get(VISIBILITY_CHECK_COMMAND_KEY);
		visibilityCheck.execute();
		observe(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('column')) {
					visibilityCheck.execute();
				}
			});

		const triggerJob = this.triggerLine(10);
		if (pipe !== PipeUnit.default) {
			triggerJob('grid', {}, [pipe]);
		}



		Object.keys(triggers)
			.forEach(name =>
				observeReply(model[name + 'Changed'])
					.subscribe(e => {
						if (e.tag.behavior === 'core') {
							return;
						}

						const units = [];
						const trigger = triggers[name];
						for (const key in e.changes) {
							const unit = trigger[key];
							if (unit) {
								units.push(unit);
							}
						}

						if (units.length > 0) {
							triggerJob(e.tag.source || name, e.changes, units);
						}
					}));
	}

	triggerLine(timeout) {
		const { model, commandPalette } = this.plugin;
		const { reduce } = model.pipe();

		let session = [];
		const job = jobLine(timeout);
		return (source, changes, units) => {
			model.scene({ status: 'start' }, {
				source
			});

			session.push(...units);
			job(() => {
				const units = reduce(session, model);
				session = [];

				const invalidate = commandPalette.get(GRID_INVALIDATE_COMMAND_KEY);
				units.forEach(pipe =>
					invalidate.execute({
						source,
						changes,
						pipe,
						why: pipe.why || 'refresh'
					})
				);
			});
		};
	}
}
