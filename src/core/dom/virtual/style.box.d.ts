import {IBoxContext} from '../box';

export declare class StyleBox {
	constructor(context: IBoxContext);

	context: IBoxContext;
	entries: Map<any, any>;

	addClass(item: string, name: string): void;
	removeClass(item: string, name: string): boolean;
	key(item: string): string;
}
