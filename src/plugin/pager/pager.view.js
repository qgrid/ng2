import { Command } from '../../core/command/command';

export class PagerView {
	constructor(model) {
		this.model = model;

		this.next = new Command({
			source: 'pager',
			execute: () => model.pagination({ current: model.pagination().current + 1 }),
			canExecute: () => (model.pagination().current + 1) * model.pagination().size < model.pagination().count
		});

		this.prev = new Command({
			source: 'pager',
			execute: () => model.pagination({ current: model.pagination().current - 1 }),
			canExecute: () => model.pagination().current > 0
		});
	}

	get resource() {
		return this.model.pagination().resource;
	}

	get size() {
		return this.model.pagination().size;
	}

	set size(value) {
		this.model.pagination({ size: value, current: 0 });
	}

	get sizeList() {
		return this.model.pagination().sizeList;
	}

	get current() {
		return this.model.pagination().current;
	}

	set current(value) {
		return this.model.pagination({ current: value });
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