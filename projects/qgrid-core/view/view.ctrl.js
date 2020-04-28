import { jobLine } from '../services/job.line';
import { PipeUnit } from '../pipe/pipe.unit';
import { Fastdom } from '../services/fastdom';
import { final } from '../infrastructure/final';

export class ViewCtrl {
	constructor(plugin, gridService) {
		this.plugin = plugin;

		this.watch(gridService);
		this.final = final();
	}

	invalidate() {
		this.final(() => {
			const { view } = this.plugin;
			const { style } = view;

			if (style.needInvalidate()) {
				const rowMonitor = style.monitor.row;
				const cellMonitor = style.monitor.cell;

				Fastdom.mutate(() => {
					// Apply mutate inside another mutate to ensure that style.invalidate is triggered last.
					Fastdom.mutate(() => {
						const domCell = cellMonitor.enter();
						const domRow = rowMonitor.enter();
						try {
							style.invalidate(domCell, domRow);
						}
						finally {
							rowMonitor.exit();
							cellMonitor.exit();
						}
					});
				});
			}
		});
	}

	triggerLine(service, timeout) {
		const { model } = this.plugin;
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

				units.forEach(pipe =>
					service.invalidate({
						source,
						changes,
						pipe,
						why: pipe.why || 'refresh'
					}));
			});
		};
	}

	watch(service) {
		const { model, observeReply } = this.plugin;;
		const { triggers } = model.pipe();
		const { pipe } = model.data();

		const triggerJob = this.triggerLine(service, 10);
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
}
