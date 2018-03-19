import {View} from './view';
import {Data} from './data';
import {Head} from './head';
import {Body} from './body';
import {Foot} from './foot';
import {IBoxContext} from './box';

export declare class Table {
	constructor(markup: object, context: IBoxContext);

	markup: object;
	context: IBoxContext;

	readonly head: Head;
	readonly body: Body;
	readonly foot: Foot;
	readonly view: View;
	readonly data: Data;
}
