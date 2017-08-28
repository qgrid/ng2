import {IRect} from './fake/element';
import {Unit} from './unit';
import {IContext} from './box';
import {ColumnView} from '../scene/view/column.view';
import {Model} from '../infrastructure/model';

export declare interface IFunc {
	(e: any): void;
}

export declare class View extends Unit {
	constructor(context: IContext, model: Model, markup: object);

	columns(): ColumnView[];

	focus(): boolean;

	blur(): void;

	isFocused(): boolean;

	addLayer(name: string): any;

	removeLayer(name: string): boolean;

	scrollLeft(value: number): number;

	scrollTop(value: number): number;

	canScrollTo(element: Element, direction: string): boolean;

	rect(): IRect;
}
