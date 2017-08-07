import {View} from '../view/view';
import {Command} from '../command/command';

export declare type ExpandOrCollapse = 'expand' | 'collapse';

export class GroupView extends View {
	constructor();

	toggleStatus: Command;
	count(node: Node): number;
	status(node: Node): ExpandOrCollapse;
	offset(node: Node): number;
	value(node: Node): string;
}
