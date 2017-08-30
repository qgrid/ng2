import {View} from './view';
import {Data} from './data';
import {Head} from './head';
import {Body} from './body';
import {Foot} from './foot';
import {IContext} from './box';

export declare class Table {
	constructor(markup: object, context: IContext);
	markup: object;
	context: IContext;
	readonly head: Head;
	readonly body: Body;
	readonly foot: Foot;
	readonly view: View;
	readonly data: Data;
}
