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

		const apply = this.y.container.apply;
		this.y.container.apply = f => {
			apply(() => {
				f();
				const container = this.y.container;
				this.model.pagination({
					current: Math.floor(container.position / model.pagination().size),
					count: container.total
				}, {
					source: 'scroll.view',
					behavior: 'core'
				});
			});
		};

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
				this.invalidate(e.tag.pin);
			}
		});
	}

	invalidate(pin) {
		Log.info('layout', 'invalidate scroll');

		const table = this.table;
		const scroll = this.model.scroll();
		if(pin === this.table.pin) {
			table.head.scrollLeft(scroll.left);
			table.foot.scrollLeft(scroll.left);
		}

		table.body.scrollTop(scroll.top);
	}

	get mode() {
		return this.model.scroll().mode;
	}
}