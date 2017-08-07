import {View} from '../view/view';
import {Command} from '../command/command';
import {CommandManager} from '../command/command.manager';

export declare class NavigationView extends View {
	constructor(model: any, commandManager: CommandManager);
	blur: Command;
	focus: Command;
	focusCell: Command;
	scrollTo: Command;
	destroy(): void;
}
