import { FakeClassList } from './class.list';
import { Rect } from '../rect';

export declare class FakeElement {
	constructor();

	classList: FakeClassList;

	readonly clientWidth: number;
	readonly clientHeight: number;
	readonly offsetWidth: number;
	readonly offsetHeight: number;

	getBoundingClientRect(): Rect;
}
