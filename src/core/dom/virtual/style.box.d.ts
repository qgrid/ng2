import { BoxContext } from '../box';

export declare class StyleBox {
	constructor(context: BoxContext);

	addClass(item: string, name: string): void;
	removeClass(item: string, name: string): boolean;
	key(item: string): string;
}
