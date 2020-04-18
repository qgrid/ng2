import { Command } from '@qgrid/core/command/command';
import { FocusAfterRenderService } from '@qgrid/core/focus/focus.service';

export class PagerPlugin {
	constructor(model, table, disposable) {
		this.model = model;
		this.table = table;

		this.next = new Command({
			source: 'pager',
			execute: () => {
				new FocusAfterRenderService(model, table, disposable);
				model.pagination({ current: model.pagination().current + 1 }, { source: 'pager.view' })
			},
			canExecute: () => (model.pagination().current + 1) * model.pagination().size < model.pagination().count
		});

		this.prev = new Command({
			source: 'pager',
			execute: () => {
				new FocusAfterRenderService(model, table, disposable);
				model.pagination({ current: model.pagination().current - 1 }, { source: 'pager.view' });
			},
			canExecute: () => model.pagination().current > 0
		});
	}

	get theme() {
		return this.model.style().classList		
	}

	get resource() {
		return this.model.pagination().resource;
	}

	get size() {
		return this.model.pagination().size;
	}

	set size(value) {
		this.model.pagination({ size: value, current: 0 }, { source: 'pager.view' });
	}

	get sizeList() {
		return this.model.pagination().sizeList;
	}

	get current() {
		return this.model.pagination().current;
	}

	set current(value) {
		return this.model.pagination({ current: value }, { source: 'pager.view' });
	}

	get from() {
		return Math.min(this.total, this.current * this.size + 1);
	}

	get to() {
		return Math.min(this.total, (this.current + 1) * this.size);
	}

	get total() {
		return this.model.pagination().count;
	}

	get totalPages() {
		return this.size === 0
			? 0
			: Math.max(1, Math.ceil(this.total / this.size));
	}

	get scroll() {
		return this.model.scroll();
	}
}