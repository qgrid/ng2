import {View} from './view';
import {Data} from './data';
import {Head} from './head';
import {Body} from './body';
import {Foot} from './foot';
import {IContext} from "./box";
import {Model} from "../infrastructure/model";

export declare class Table {
	constructor(public model: Model, public markup: object, public context: IContext);

	readonly head: Head;

	readonly body: Body;

	readonly foot: Foot;

	readonly view: View;

	readonly data: Data;

}