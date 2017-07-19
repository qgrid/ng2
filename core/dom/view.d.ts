import {IRect} from './fake/element';
import {Unit} from './unit';
import {IContext} from './box';

export declare interface IFunc{
	(e: any): void;
}

export declare class View extends Unit {
	constructor(markup: object, context: IContext);
	markup: object;
	context: IContext;
	layers: Map<any, any>;
	focus(): boolean;
	blur(): void;
	isFocused(): boolean;
	keyDown(f: IFunc ): EventListener;
	addLayer(name: string): any;
	removeLayer(name: string): boolean;
	scrollLeft(value: number): number;
	scrollTop(value: number): number;
	canScrollTo(element: Element, direction: string): boolean;
	rect(): IRect;
}
