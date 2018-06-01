import { IBoxContext } from '../box';

export declare class StyleBox {
	constructor(context: IBoxContext);

	addClass(item: string, name: string): void;
	removeClass(item: string, name: string): boolean;
	key(item: string): string;
}
