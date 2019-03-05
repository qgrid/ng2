import { EventEmitter } from '@angular/core';
import { isNumber, isFunction, noop } from 'ng2-qgrid/core/utility/kit';
import { IVscrollSettings } from './vscroll.settings';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { jobLine } from 'ng2-qgrid/core/services/job.line';

export const rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

export class VscrollContainer {
	private job = jobLine(0);

	count = 0;
	total = 0;
	position = 0;
	cursor = 0;
	lastPage = 0;
	items = [];

	resetEvent = new EventEmitter<{ handled: boolean, source: string }>();
	updateEvent = new EventEmitter<{ source: string }>();
	drawEvent = new EventEmitter<{ position: number }>();

	constructor(private settings: IVscrollSettings) {
	}

	tick(f: () => void) {
		rAF(f);
	}

	read(f: () => void) {
		f();
	}

	write(f: () => void) {
		f();
	}

	apply(f: () => void, emit: (f: () => void) => void) {
		emit(f);
	}

	get currentPage() {
		const { threshold } = this.settings;
		const { cursor } = this;

		return Math.ceil((cursor + threshold) / threshold) - 1;
	}

	update(count: number, source: string) {
		this.count = count;
		this.total = Math.max(this.total, count);

		console.log(`UPDATE: ${count}, ${source}`);

		this.updateEvent.emit({ source });

		if (this.currentPage > this.lastPage) {
			this.fetchPage(this.currentPage);
		}
	}

	fetchPage(page: number) {
		const { lastPage } = this;
		const { threshold } = this.settings;

		this.lastPage = page;

		console.log(`FETCH: ${page}`);

		const deferred = {
			resolve: (count: number) => this.update(count, 'fetch'),
			reject: noop,
		};

		if (page === 0) {
			this.settings.fetch(0, threshold, deferred);
		} else {
			const skip = (lastPage + 1) * threshold;
			if (this.total < skip) {
				deferred.resolve(this.total);
			} else {
				const take = (page - lastPage) * threshold;
				this.settings.fetch(skip, take, deferred);
			}
		}
	}

	reset() {
		this.count = 0;
		this.total = 0;
		this.position = 0;
		this.cursor = 0;
		this.items = [];

		const e = { handled: false, source: 'container' };
		this.resetEvent.emit(e);

		this.fetchPage(0);
	}
}

export type VscrollSize = (element: HTMLElement, index: number) => number;

export function sizeFactory(
	size: number | VscrollSize,
	container: VscrollContainer,
	element: HTMLElement,
	index: number
): () => number {
	if (isFunction(size)) {
		return () => (size as VscrollSize)(element, container.position + index);
	}

	if (isNumber(size)) {
		return () => size as number;
	}

	throw new AppError('vscroll.utility', `Invalid size ${size}`);
}
