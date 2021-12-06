import { IVscrollSettings } from '@qgrid/core';

export class VscrollSettings implements IVscrollSettings {
	threshold = 64;
	placeholderHeight = 0;
	placeholderWidth = 0;
	resetTriggers = ['resize'];
	emit: (f: () => void) => void;

	constructor(private getCount: () => number) {
	}

	fetch(skip: number, take: number, d: { resolve: (count: number) => void, reject: () => void }) {
		d.resolve(this.getCount());
	}

	rowHeight(element: HTMLElement) {
		let height = element.offsetHeight;
		const style = getComputedStyle(element);

		height += Number.parseInt(style.marginTop, 10) + Number.parseInt(style.marginBottom, 10);
		return height;
	}

	columnWidth(element: HTMLElement) {
		let width = element.offsetWidth;
		const style = getComputedStyle(element);

		width += Number.parseInt(style.marginLeft, 10) + Number.parseInt(style.marginRight, 10);
		return width;
	}
}
