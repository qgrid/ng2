import { Log } from '../infrastructure/log';
import { isFunction, identity } from '../utility/kit';
import { Fastdom } from '../services/fastdom';

export class ScrollView {
	constructor(model, table, vscroll, gridService) {
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

		const subscribe =
			(this.y.container.drawEvent.on || this.y.container.drawEvent.subscribe)
				.bind(this.y.container.drawEvent);

		const updateCurrentPage = position => {
			const { size, current, count } = pagination();
			const newCurrent = size === 0
				? 0
				: count - 1 <= position + size
					? Math.ceil(count / size) - 1
					: Math.floor((position + size / 2) / size);

			if (newCurrent !== current) {
				pagination({ current: newCurrent }, {
					source: 'scroll.view',
					behavior: 'core'
				});
			}
		};

		const updateTotalCount = () => {
			const { effect } = model.pipe();
			if (effect.hasOwnProperty('memo')) {
				const count = effect.memo.length;
				pagination({ count }, {
					source: 'scroll.view',
					behavior: 'core'
				});

				return count;
			}

			return pagination().count;
		};

		subscribe(e => {
			const { position } = e;
			updateCurrentPage(position);

			scroll({ cursor: position }, {
				source: 'scroll.view',
				behavior: 'core'
			});
		});


		switch (scroll().mode) {
			case 'virtual': {
				this.y.settings.fetch = (skip, take, d) => {
					model.fetch({ skip }, {
						source: 'scroll.view',
						behavior: 'core'
					});

					if (skip === 0) {
						const count = updateTotalCount();
						d.resolve(count);
					} else {
						gridService.invalidate({
							source: 'scroll.view',
							why: 'refresh'
						}).then(() => {
							const count = updateTotalCount();
							d.resolve(count);
						});
					}
				};

				let startSource;
				const resetTriggers = new Set(scroll().resetTriggers);
				model.sceneChanged.watch(e => {
					if (e.hasChanges('status')) {
						const { status } = e.state;
						switch (status) {
							case 'start': {
								startSource = e.tag.source;
								if (resetTriggers.has(startSource)) {
									model.fetch({ skip: 0 }, {
										source: 'scroll.view',
										behavior: 'core'
									});
								}
								break;
							}
							case 'stop': {
								if (resetTriggers.has(startSource)) {
									this.y.container.reset();
								}
								break;
							}
						}
					}
				});

				break;
			}
			default:
				model.paginationChanged.watch(() => this.y.container.reset());
		}

		model.scrollChanged.watch(e => {
			if (e.source === 'scroll.view') {
				return;
			}

			if (e.hasChanges('mode')) {
				switch (e.state.mode) {
					case 'virtual': {
						scroll({
							map: {
								rowToView: index => index - this.y.container.position,
								viewToRow: index => index + this.y.container.position
							}
						}, {
								source: 'scroll.view',
								behavior: 'core'
							});
						break;
					}
					case 'default': {
						scroll({
							map: {
								rowToView: identity,
								viewToRow: identity
							}
						});
						break;
					}
				}
			}

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