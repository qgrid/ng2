import { Log } from '../infrastructure/log';
import { isFunction } from '../utility/kit';
import { Fastdom } from '../services/fastdom';

export class ScrollView {
	constructor(model, table, vscroll) {
		
		this.model = model;
		this.table = table;

		const scroll = model.scroll;
		const rowHeight = model.row().height;
		const pagination = model.pagination;
		const settings = {
			threshold: model.pagination().size,
			resetTriggers: []
		};

		if (rowHeight > 0 || isFunction(rowHeight)) {
			settings.rowHeight = rowHeight;
		}

		this.y = vscroll.factory(settings);

		this.y.container.read = Fastdom.measure;
		this.y.container.write = Fastdom.mutate;

		this.y.container.drawEvent.on(e => {
			scroll({ cursor: e.position }, {
				source: 'scroll.view',
				behavior: 'core'
			});

			const current = Math.floor(e.position / pagination().size);
			if (current !== pagination().current) {
				pagination({ current }, {
					source: 'scroll.view',
					behavior: 'core'
				});
			}
		});

		switch (scroll().mode) {
			case 'virtual': {
				this.y.settings.fetch = (skip, take, d) => {
					model.fetch({ skip }, {
						source: 'scroll.view'
					});

					model.dataChanged.on((e, off) => {
						if (e.hasChanges('rows')) {
							const count = e.state.rows.length;
							if (pagination().count !== count) {
								pagination({ count }, {
									source: 'scroll.view',
									behavior: 'core'
								});
							}

							d.resolve(count);
							off();
						}
					});
				};

				model.sceneChanged.watch(e => {
					if (e.tag.source === 'scroll.view') {
						return;
					}

					if (e.hasChanges('status')) {
						const status = e.state.status;
						switch (status) {
							case 'stop': {
								this.y.container.reset();
								break;
							}
						}
					}
				});

				break;
			}
			default:
				model.paginationChanged.watch(() => {
					this.y.container.reset();
				});
		}

		model.scrollChanged.watch(e => {
			if (e.hasChanges('left') || e.hasChanges('top')) {
				this.invalidate();
			}
		});
	}

	invalidate() {
		Log.info('layout', 'invalidate scroll');

		const table = this.table;
		const scroll = this.model.scroll();

		Fastdom.mutate(() => {
			table.view.scrollLeft(scroll.left);
			table.view.scrollTop(scroll.top);
		});
	}

	get mode() {
		return this.model.scroll().mode;
	}
}