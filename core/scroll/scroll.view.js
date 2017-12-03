import {View} from '../view';
import {Log} from '../infrastructure';
import {isFunction} from '../utility';

export class ScrollView extends View {
	constructor(model, table, vscroll, gridService) {
		super(model);

		this.table = table;

		const scroll = model.scroll;
		const rowHeight = model.row().height;
		const pagination = model.pagination;
		const settings = {
			threshold: model.pagination().size,
		};

		if (rowHeight > 0 || isFunction(rowHeight)) {
			settings.rowHeight = rowHeight;
		}

		this.y = vscroll.factory(settings);

		this.y.container.drawEvent.on(e => {
			scroll({
				cursor: e.position
			}, {
				source: 'scroll.view',
				behavior: 'core'
			});

			const currentPage = Math.floor(e.position / pagination().size);
			if (currentPage !== pagination().current) {
				pagination({
					current: currentPage
				}, {
					source: 'scroll.view',
					behavior: 'core'
				});
			}
		});

		switch (scroll().mode) {
			case 'virtual': {

				const triggers = model.data().triggers;
				Object.keys(triggers).forEach(name =>
					this.using(model[name + 'Changed']
						.watch(e => {
							if (e.tag.behavior !== 'core' && e.tag.source !== 'scroll.view') {
								const changes = Object.keys(e.changes);
								if (triggers[name].find(key => changes.indexOf(key) >= 0)) {
									this.y.container.reset();
								}
							}
						})));

				this.y.settings.fetch = (skip, take, d) => {
					model.fetch({
						skip: skip
					}, {
						source: 'scroll.view',
						behavior: 'core'
					});

					if (skip + take >= model.data().rows.length) {
						gridService
							.invalidate('scroll.view')
							.then(() => {
								const total = model.data().rows.length;
								if (pagination().count !== total) {
									pagination({
										count: total
									}, {
										source: 'scroll.view',
										behavior: 'core'
									});
								}

								d.resolve(total);
							});
					}
				};

				break;
			}
			default:
				this.using(model.paginationChanged.watch(() => {
					this.y.container.reset();
				}));
		}

		this.using(model.scrollChanged.watch(e => {
			if (e.hasChanges('left') || e.hasChanges('top')) {
				this.invalidate();
			}
		}));
	}

	invalidate() {
		Log.info('layout', 'invalidate scroll');

		const table = this.table;
		const scroll = this.model.scroll();

		table.view.scrollLeft(scroll.left);
		table.view.scrollTop(scroll.top);
	}

	get mode() {
		return this.model.scroll().mode;
	}
}