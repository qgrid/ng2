import {FakeElement} from './fake/element';

declare const fakeElement: FakeElement;

export declare class Unit {
	constructor();
	rect(): object;
	addClass(name: string): void;
	removeClass(name: string): void;
	hasClass(name: string): boolean;
	width(): number;
	height(): number;
	getElement(): FakeElement;
}