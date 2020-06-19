import { PAGINATION_PREVIOUS_COMMAND_KEY, PAGINATION_NEXT_COMMAND_KEY } from '@qgrid/core/command-bag/command.bag';

export class PagerPlugin {
	constructor(plugin) {
		const { commandPalette } = plugin;

		this.plugin = plugin;

		this.next = commandPalette.get(PAGINATION_NEXT_COMMAND_KEY);
		this.prev = commandPalette.get(PAGINATION_PREVIOUS_COMMAND_KEY);
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