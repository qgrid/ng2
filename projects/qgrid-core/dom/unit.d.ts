import { FakeElement } from './fake/element';
import { Rect } from './rect';

declare const fakeElement: FakeElement;

export declare class Unit {
	constructor();

	rect(): Rect;
	addClass(name: string): void;
	removeClass(name: string): void;
	hasClass(name: string): boolean;
	width(): number;
	height(): number;
	getElement(): FakeElement;
}
