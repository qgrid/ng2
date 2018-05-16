import { IRect } from './fake/element';
import { Unit } from './unit';
import { IBoxContext } from './box';
import { ColumnView } from '../scene/view/column.view';
import { Model } from '../infrastructure/model';

export declare class View extends Unit {
	constructor(context: IBoxContext, model: Model, markup: object);

	columns(): ColumnView[];
	focus(): boolean;
	blur(): void;
	isFocused(): boolean;
	addLayer(name: string): any;
	removeLayer(name: string): boolean;
	scrollLeft(value: number): number;
	scrollTop(value: number): number;
	canScrollTo(element: Element, direction: string): boolean;
	rect(area?: string): IRect;
	width(area?: string): number;
	height(area?: string): number;
}
