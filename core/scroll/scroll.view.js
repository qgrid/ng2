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
			const container = this.y.container;
			const currentPage = Math.floor(e.position / model.pagination().size);
			const totalCount = container.total;
			this.model.pagination({
				current: currentPage,
				count: totalCount
			}, {
				source: 'scroll.view',
				behavior: 'core'
			});
		});

		switch (scroll().mode) {
			case 'virtual': {
				this.y.settings.fetch = (skip, take, d) => {
					this.model.pagination({
						current: Math.floor(skip / take)
					}, {
						source: 'scroll.view',
						behavior: 'core'
					});

					gridService
						.invalidate('scroll.view')
						.then(d.resolve(model.view().rows.length));
				};

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

		table.view.scrollLeft(scroll.left);
		table.view.scrollTop(scroll.top);
	}

	get mode() {
		return this.model.scroll().mode;
	}
}