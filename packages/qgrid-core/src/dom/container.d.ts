import { Rect } from './rect';

export interface IClassList {
	add: (name: string) => void;
	remove: (name: string) => void;
	contains: (name: string) => boolean;
}

export declare class Container {
	readonly clientWidth: number;
	readonly clientHeight: number;
	readonly offsetWidth: number;
	readonly offsetHeight: number;
	readonly classList: IClassList;

	constructor(elements: Element[]);


	getBoundingClientRect(): Rect;
	addClass(name: string): void;
	removeClass(name: string): void;
	hasClass(name: string): boolean;
}
