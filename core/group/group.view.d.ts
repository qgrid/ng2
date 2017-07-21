import {View} from '../view/view';
import {Command} from '../infrastructure/command';
import {IValueFactory} from '../services/value';

export declare type ExpandOrCollapse = 'expand' | 'collapse';

export class GroupView extends View {
	constructor();
	valueFactory: IValueFactory;
	toggleStatus: Command;
	count(node: Node): number;
	status(node: Node): ExpandOrCollapse;
	offset(node: Node): number;
	value(node: Node): string;
}
