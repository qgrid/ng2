import {IContext} from "../box";

export declare class StyleBox {
	constructor(public context: IContext);

	entries: Map;

	addClass(item: string, name: string): void;

	removeClass(item: string, name: string): boolean;

	key(item: string): string;
}