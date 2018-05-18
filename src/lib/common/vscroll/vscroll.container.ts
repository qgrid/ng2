import { EventEmitter } from '@angular/core';
import { isUndefined, isNumber, isFunction } from 'ng2-qgrid/core/utility/kit';
import { IVscrollSettings } from './vscroll.settings';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';

export const rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

export class VscrollContainer {
	constructor(private settings: IVscrollSettings) {
	}

	count = 0;
	total = 0;
	position = 0;
	cursor = 0;
	page = 0;
	items = [];
	force = true;
	resetEvent = new EventEmitter<any>();
	updateEvent = new EventEmitter<any>();
	drawEvent = new EventEmitter<any>();
	deferred = null;

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

	place() {
		const threshold = this.settings.threshold;
		const cursor = this.cursor;
		return Math.ceil((cursor + threshold) / threshold) - 1;
	}

	update(count: number, force?: boolean) {
		const settings = this.settings;
		const threshold = settings.threshold;
		const largestPage = this.page;
		const currentPage = this.place();

		if (this.count !== count) {
			this.count = count;
			this.total = Math.max(this.total, count);
			this.updateEvent.emit({
				force: isUndefined(force)
					? (isNumber(settings.rowHeight) && settings.rowHeight > 0) || (isNumber(settings.columnWidth) && settings.columnWidth > 0)
					: force
			});
		}

		if (force || currentPage > largestPage) {
			this.page = currentPage;

			new Promise<number>((resolve, reject) => {
				const deferred = this.deferred = { resolve, reject };
				if (currentPage === 0) {
					settings.fetch(0, threshold, deferred);
				} else {
					const skip = (largestPage + 1) * threshold;
					if (this.total < skip) {
						deferred.resolve(this.total);
					} else {
						const take = (currentPage - largestPage) * threshold;
						settings.fetch(skip, take, deferred);
					}
				}
			}).then(nextCount => {
				this.force = true;
				this.update(nextCount);
			}).catch(() => this.deferred = null);
		}
	}

	reset() {
		if (this.deferred) {
			this.deferred = null;
		}

		this.count = 0;
		this.total = 0;
		this.position = 0;
		this.cursor = 0;
		this.page = 0;
		this.items = [];
		this.force = true;

		const e = { handled: false, source: 'container' };
		this.resetEvent.emit(e);

		this.update(this.count, true);
	}
}

export type GetSize = (element: HTMLElement, index: number) => number;

export function sizeFactory(
	size: number | GetSize,
	container: VscrollContainer,
	element: HTMLElement,
	index: number): () => number {
	if (isFunction(size)) {
		return () => (size as GetSize)(element, container.position + index);
	}

	if (isNumber(size)) {
		return () => size as number;
	}

	throw new AppError('vscroll.utility', `Invalid size ${size}`);
}
