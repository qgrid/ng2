import {View} from '../view';
import {Log} from '../infrastructure';

export class ScrollView extends View {
	constructor(model, table, vscroll, gridService) {
		super(model);

		this.table = table;

		const scroll = model.scroll;
		this.y = vscroll.factory({
			threshold: model.pagination().size,
			rowHeight: model.row().height
		});

		this.y.container.drawEvent.on(e => {
			scroll({
				cursor: e.position
			}, {
				source: 'scroll.view',
				behavior: 'core'
			});

			const currentPage = Math.floor(e.position / model.pagination().size);
			model.pagination({
				current: currentPage
			}, {
				source: 'scroll.view',
				behavior: 'core'
			});
		});

		switch (scroll().mode) {
			case 'virtual': {
				this.y.settings.fetch = (skip, take, d) => {
					model.fetch({
						skip: skip
					}, {
						source: 'scroll.view',
						behavior: 'core'
					});

					gridService
						.invalidate('scroll.view')
						.then(() => {
							const total = model.data().rows.length;
							model.pagination({
								count: total
							}, {
								source: 'scroll.view',
								behavior: 'core'
							});

							d.resolve(total);
						});
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