import { EventEmitter } from '@angular/core';
import {
	Defer,
	GridError,
	isFunction,
	isNumber,
	IVscrollContainer,
	IVscrollSettings,
} from '@qgrid/core';

export const rAF = window.requestAnimationFrame;

export class VscrollContainer implements IVscrollContainer {
	private lastPage = 0;

	force = false;
	count = 0;
	position = 0;

	reset$ = new EventEmitter<{ handled: boolean; source: string }>();
	update$ = new EventEmitter<number>();
	draw$ = new EventEmitter<{ position: number }>();

	get currentPage() {
		const threshold = this.settings.threshold;
		const position = this.position;
		return Math.ceil((position + threshold) / threshold) - 1;
	}

	constructor(
		private settings: IVscrollSettings,
	) {
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

	apply(f: () => void, emit: (x: () => void) => void) {
		emit(f);
	}

	update(count: number) {
		if (this.count !== count) {
			this.count = count;
			this.update$.emit(count);
		}

		const { lastPage, currentPage } = this;
		if (currentPage > lastPage) {
			this.fetchPage(currentPage);
		}
	}

	fetchPage(page: number) {
		const { settings, lastPage } = this;
		const { threshold } = settings;

		this.lastPage = page;

		const deferred = new Defer<number>();

		deferred.promise.then(count => {
			this.force = true;

			if (count !== this.count) {
				this.update(count);
			}
		});

		if (page === 0) {
			settings.fetch(0, threshold, deferred);
		} else {
			const skip = (lastPage + 1) * threshold;
			if (this.count < skip) {
				deferred.resolve(this.count);
			} else {
				const take = (page - lastPage) * threshold;
				settings.fetch(skip, take, deferred);
			}
		}
	}

	reset() {
		this.force = false;
		this.position = 0;
		this.count = 0;
		this.lastPage = 0;

		this.reset$.emit({
			handled: false,
			source: 'container',
		});
	}
}

export type VscrollSize = (element: HTMLElement, index: number) => number;

export function sizeFactory(
	size: number | VscrollSize,
	container: VscrollContainer,
	element: HTMLElement,
	index: number,
): () => number {
	if (isFunction(size)) {
		return () => (size as VscrollSize)(element, container.position + index);
	}

	if (isNumber(size)) {
		return () => size as number;
	}

	throw new GridError('vscroll.utility', `Invalid size ${size}`);
}
