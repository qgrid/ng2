import { Component, Input, Optional } from '@angular/core';
import { Command } from 'ng2-qgrid/core/command';
import { PluginComponent } from '../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';

@Component({
	selector: 'q-grid-pager',
	templateUrl: './pager.component.html'
})
export class PagerComponent extends PluginComponent {
	@Input('size') private paginationSize;
	@Input('sizeList') private paginationSizeList;

	public next = new Command({
		execute: () => (this.current = this.current + 1),
		canExecute: () => (this.current + 1) * this.size < this.total
	});

	public prev = new Command({
		execute: () => (this.current = this.current - 1),
		canExecute: () => this.current > 0
	});

	constructor(@Optional() root: RootService) {
		super(root);

		this.models = ['pagination'];
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
		this.model.pagination({ current: value });
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
		return Math.max(1, Math.ceil(this.total / this.size));
	}

	get scroll() {
		return this.model.scroll();
	}
}
