import { Rect } from './rect';

export interface IClassList {
	add: (name: string) => void;
	remove: (name: string) => void;
	contains: (name: string) => boolean;
}

export declare class Container {
	constructor(elements: Element[]);

	elements: Element[];

	readonly clientWidth: number;
	readonly clientHeight: number;
	readonly offsetWidth: number;
	readonly offsetHeight: number;
	readonly classList: IClassList;

	getBoundingClientRect(): Rect;
	addClass(name: string): void;
	removeClass(name: string): void;
	hasClass(name: string): boolean;
}
