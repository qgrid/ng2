import {View} from '../view/view';
import {Command} from '../command/command';

export declare class HighlightView extends View {
	constructor(model: any, timeout: number);

	column: Command;
	row: Command;
}
