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

    constructor(private container: VscrollContainer) {
    }

    fetch(skip: number, take: number, d) {
        d.resolve(this.container.total);
    }

    rowHeight(element: HTMLElement) {
        let height = element.offsetHeight;
        const style = getComputedStyle(element);

        height += parseInt(style.marginTop) + parseInt(style.marginBottom);
        return height;
    }

    columnWidth(element: HTMLElement) {
        let width = element.offsetWidth;
        const style = getComputedStyle(element);

        width += parseInt(style.marginLeft) + parseInt(style.marginRight);
        return width;
    }
}
