import {View} from '../view/view';
import {Shortcut} from '../infrastructure/shortcut';
import {Command} from '../infrastructure/command';
import {Navigation} from './navigation';
import {CommandManager} from "../infrastructure/command.manager";
import {Model} from "../infrastructure/model";
import {Table} from "../dom/table";

export declare class NavigationView extends View {
	constructor(model: Model, public table: Table, commandManager: CommandManager);

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