import {View} from '../view/view';
import {Command} from '../command/command';

export declare class HeadView extends View {
	constructor(model: any, tagName: string);

	rows: any[];
	drop: Command;
	drag: Command;
	resize: Command;
}
