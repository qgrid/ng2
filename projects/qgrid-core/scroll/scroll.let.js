import { Log } from '../infrastructure/log';
import { isFunction, identity } from '../utility/kit';
import { Fastdom } from '../services/fastdom';

export class ScrollLet {
	constructor(plugin, vscroll) {
		const { model, observeReply, service } = plugin;
		const { scroll, row, pagination, fetch, pipe } = model;

		this.plugin = plugin;
	
		const rowHeight = row().height;
		const settings = {
			threshold: pagination().size,
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
			const { effect } = pipe();
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
					fetch({ skip }, {
						source: 'scroll.view',
						behavior: 'core'
					});

					if (skip === 0) {
						const count = updateTotalCount();
						d.resolve(count);
					} else {
						service.invalidate({
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

				observeReply(model.sceneChanged)
					.subscribe(e => {
						if (e.hasChanges('status')) {
							const { status } = e.state;
							switch (status) {
								case 'start': {
									startSource = e.tag.source;
									if (resetTriggers.has(startSource)) {
										fetch({ skip: 0 }, {
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
			default: {
				observeReply(model.paginationChanged)
					.subscribe(e => {
						if (e.tag.behavior !== 'core') {
							this.y.container.reset();
						}
					});
				break;
			}
		}

		observeReply(model.scrollChanged)
			.subscribe(e => {
				if (e.tag.source === 'scroll.view') {
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

		const { model, table } = this.plugin;
		const { view } = table;
		const { left, top } = model.scroll();

		Fastdom.mutate(() => {
			view.scrollLeft(left);
			view.scrollTop(top);
		});
	}

	get mode() {
		return this.plugin.model.scroll().mode;
	}
}