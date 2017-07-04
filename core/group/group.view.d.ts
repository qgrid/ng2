import {View} from '../view/view';
import {Command} from '../infrastructure/command';
import {Model} from "../infrastructure/model";
import {IValueFactory} from "../services/value";

export declare type ExpandOrCollapse = 'expand' | 'collapse';

export class GroupView extends View {
	constructor(model: Model);

	valueFactory: IValueFactory;
	toggleStatus: Command;

	count(node: Node): number;

	status(node: Node): ExpandOrCollapse;

	offset(node: Node): number;

	value(node: Node): string;
}