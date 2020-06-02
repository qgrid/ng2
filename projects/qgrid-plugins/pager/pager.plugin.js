import { Command } from '@qgrid/core/command/command';
import { FocusAfterRenderService } from '@qgrid/core/focus/focus.service';

export class PagerPlugin {
	constructor(plugin) {
		const { model } = plugin;

		this.plugin = plugin;

		const { shortcut } = model.pagination();

		this.next = new Command({
			source: 'pager',
			shortcut: shortcut.next,
			execute: () => {
				new FocusAfterRenderService(plugin);
				model.pagination({ current: model.pagination().current + 1 }, { source: 'pager.view' })
			},
			canExecute: () => (model.pagination().current + 1) * model.pagination().size < model.pagination().count
		});

		this.prev = new Command({
			source: 'pager',
			shortcut: shortcut.prev,
			execute: () => {
				new FocusAfterRenderService(plugin);
				model.pagination({ current: model.pagination().current - 1 }, { source: 'pager.view' });
			},
			canExecute: () => model.pagination().current > 0
		});
	}

	get theme() {
		return this.plugin.model.style().classList
	}

	get resource() {
		return this.plugin.model.pagination().resource;
	}

	get size() {
		return this.plugin.model.pagination().size;
	}

	set size(value) {
		this.plugin.model.pagination({ size: value, current: 0 }, { source: 'pager.view' });
	}

	get sizeList() {
		return this.plugin.model.pagination().sizeList;
	}

	get current() {
		return this.plugin.model.pagination().current;
	}

	set current(value) {
		return this.plugin.model.pagination({ current: value }, { source: 'pager.view' });
	}

	get from() {
		return Math.min(this.total, this.current * this.size + 1);
	}

	get to() {
		return Math.min(this.total, (this.current + 1) * this.size);
	}

	get total() {
		return this.plugin.model.pagination().count;
	}

	get totalPages() {
		return this.size === 0
			? 0
			: Math.max(1, Math.ceil(this.total / this.size));
	}

	get scroll() {
		return this.plugin.model.scroll();
	}

	get mode() {
		return this.plugin.model.pagination().mode;
	}
}