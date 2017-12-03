import { jobLine } from '@grid/core/services';
import { Log } from '@grid/core/infrastructure';
import { View } from '@grid/core/view/view';

export class ViewCtrl extends View {
	constructor(view, gridService) {
		super(view.model);

		this.view = view;
		this.watch(gridService);
	}

	invalidate() {
		const style = this.view.style;
		if (style.needInvalidate()) {
			const rowMonitor = style.monitor.row;
			const cellMonitor = style.monitor.cell;

			const domCell = cellMonitor.enter();
			const domRow = rowMonitor.enter();
			try {
				style.invalidate(domCell, domRow);
			}
			finally {
				rowMonitor.exit();
				cellMonitor.exit();
			}
		}
	}

	watch(service) {
		const invalidateJob = jobLine(10);
		const sceneJob = jobLine(10);
		const model = this.model;
		const triggers = model.data().triggers;

		invalidateJob(() => service.invalidate('grid'));
		Object.keys(triggers)
			.forEach(name =>
				this.using(model[name + 'Changed']
					.watch(e => {
						const changes = Object.keys(e.changes);
						if (e.tag.behavior !== 'core' && triggers[name].find(key => changes.indexOf(key) >= 0)) {
							invalidateJob(() => service.invalidate(name, e.changes));
						}
					})));

		model.sceneChanged.watch(e => {
			if (e.hasChanges('round')) {
				Log.info(e.tag.source, `scene ${e.state.round}`);

				if (e.state.status === 'start') {
					sceneJob(() => {
						Log.info(e.tag.source, 'scene stop');

						model.scene({
							round: 0,
							status: 'stop'
						}, {
							source: 'view.ctrl',
							behavior: 'core'
						});
					});
				}
			}
		});
	}
}