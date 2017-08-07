import {IRect} from './fake/element';

export interface IClassListResult{
	add: (name: string) => void;
	remove: (name: string) => void;
	contains: (name: string) => boolean;
}

export declare class Container {
	constructor(elements: Element[]);
	elements: Element[];
	getBoundingClientRect(): IRect;
	addClass(name: string): void;
	removeClass(name: string): void;
	hasClass(name: string): boolean;
	readonly clientWidth: number;
	readonly clientHeight: number;
	readonly classList: IClassListResult;
}
