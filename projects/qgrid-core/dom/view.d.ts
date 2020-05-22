import { Rect } from './rect';
import { Unit } from './unit';
import { BoxContext } from './box';
import { ColumnView } from '../scene/view/column.view';
import { Model } from '../model/model';

export declare class View extends Unit {
	constructor(context: BoxContext, model: Model);

	columns(): ColumnView[];

	focus(): boolean;
	blur(): void;
	isFocused(): boolean;

	scrollLeft(value?: number): number;
	scrollTop(value?: number): number;
	scrollHeight(): number;
	scrollWidth(): number;
	canScrollTo(element: Element, direction: string): boolean;

	rect(area?: string): Rect;
	width(area?: string): number;
	height(area?: string): number;

	addLayer(name: string): any;
	removeLayer(name: string): boolean;
	hasLayer(name: string): boolean;
}
