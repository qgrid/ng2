import { Component, OnInit } from '@angular/core';
import { GridPlugin, Command } from 'ng2-qgrid';

@Component({
	selector: 'example-plugin-my-pager',
	templateUrl: 'example-plugin-my-pager.component.html',
	styleUrls: ['example-plugin-my-pager.component.scss'],
	providers: [GridPlugin]
})
export class ExamplePluginMyPagerComponent {
	goto = new Command({
		execute: page => this.currentPage = page,
		canExecute: page => page >= 0 && page < this.numberOfPages
	});

	gotoNext = new Command({
		execute: () => this.currentPage = this.currentPage + 1,
		canExecute: () => this.currentPage < this.numberOfPages - 1,
		shortcut: 'ctrl+right'
	});

	gotoPrev = new Command({
		execute: () => this.currentPage = this.currentPage - 1,
		canExecute: () => this.currentPage > 0,
		shortcut: 'ctrl+left'
	});

	constructor(private plugin: GridPlugin) {
	}

	ngOnInit() {
		const { shortcut, manager } = this.model.action();
		shortcut.register(manager, [
			this.gotoNext,
			this.gotoPrev
		]);
	}

	get pages() {
		return Array.from(Array(this.numberOfPages).keys());
	}

	get currentPage() {
		return this.model.pagination().current;
	}

	set currentPage(value) {
		this.model.pagination({ current: value });
	}

	private get numberOfPages() {
		const { count, size } = this.model.pagination();
		return Math.max(1, Math.ceil(count / size));
	}

	private get model() {
		return this.plugin.model;
	}
}