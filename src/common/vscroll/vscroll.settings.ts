import { VscrollContainer } from './vscroll.container';

export interface IVscrollSettings {
	threshold?: number;
	placeholderHeight?: number;
	placeholderWidth?: number;
	resetTriggers?: Array<string>;
	rowHeight?: number | ((element: HTMLElement) => number);
	columnWidth?: number | ((element: HTMLElement) => number);
	fetch?: (skip: number, take: number, d) => void;
}

export class VscrollSettings implements IVscrollSettings {
	threshold = 64;
	placeholderHeight = 0;
	placeholderWidth = 0;
	resetTriggers = ['resize'];

	constructor(private getCount: () => number) {
	}

	fetch(skip: number, take: number, d: { resolve: (count: number) => void, reject: () => void }) {
		d.resolve(this.getCount());
	}

	rowHeight(element: HTMLElement) {
		let height = element.offsetHeight;
		const style = getComputedStyle(element);

		height += Number.parseInt(style.marginTop) + Number.parseInt(style.marginBottom);
		return height;
	}

	columnWidth(element: HTMLElement) {
		let width = element.offsetWidth;
		const style = getComputedStyle(element);

		width += Number.parseInt(style.marginLeft) + Number.parseInt(style.marginRight);
		return width;
	}
}
