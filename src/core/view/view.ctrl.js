import { jobLine } from '../services/job.line';
import { PipeUnit } from '../pipe/pipe.unit';
import { Fastdom } from '../services/fastdom';

export class ViewCtrl {
	constructor(model, view, gridService) {
		this.model = model;
		this.view = view;

		this.watch(gridService);
		this.ticking = false;
	}

	invalidate() {
		if (this.ticking) {
			return;
		}

		const { style } = this.view;
		if (style.needInvalidate()) {
			this.ticking = true;
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
						this.ticking = false;
						rowMonitor.exit();
						cellMonitor.exit();
					}
				});
			});
		}
	}

	triggerLine(service, timeout) {
		const job = jobLine(timeout);
		const model = this.model;
		const reduce = model.pipe().reduce;
		let sessionUnits = [];

		return (source, changes, units) => {
			model.scene({ status: 'start' }, {
				source
			});

			sessionUnits.push(...units);
			job(() => {
				const jobUnits = reduce(sessionUnits, model);
				sessionUnits = [];

				jobUnits.forEach(pipe => service.invalidate({
					source,
					changes,
					pipe,
					why: pipe.why || 'refresh'
				}));
			});
		};
	}

	watch(service) {
		const triggerJob = this.triggerLine(service, 10);

		const model = this.model;
		const { triggers } = model.pipe();
		const { pipe } = model.data();

		if (pipe !== PipeUnit.default) {
			triggerJob('grid', {}, [pipe]);
		}

		Object.keys(triggers)
			.forEach(name =>
				model[name + 'Changed']
					.watch(e => {
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
