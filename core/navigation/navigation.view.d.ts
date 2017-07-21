import {View} from '../view/view';
import {Shortcut} from '../infrastructure/shortcut';
import {Command} from '../infrastructure/command';
import {Navigation} from './navigation';
import {CommandManager} from '../infrastructure/command.manager';

export declare class NavigationView extends View {
	constructor(commandManager: CommandManager);
	shortcut: Shortcut;
	navigation: Navigation;
	shortcutOff: boolean;
	blur: Command;
	focus: Command;
	focusCell: Command;
	scrollTo: Command;
	scroll(view: View, target: View): void;
	destroy(): void;
}
