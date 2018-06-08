import { View } from './view';
import { Data } from './data';
import { Head } from './head';
import { Body } from './body';
import { Foot } from './foot';
import { BoxContext } from './box';

export declare class Table {
	constructor(markup: { [key: string]: HTMLElement }, context: BoxContext);

	readonly markup: { [key: string]: HTMLElement };
	readonly context: BoxContext;

	readonly head: Head;
	readonly body: Body;
	readonly foot: Foot;
	readonly view: View;
	readonly data: Data;
}
