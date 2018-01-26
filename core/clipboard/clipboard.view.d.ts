import { View } from '../view/view';
import { SelectionModel } from './selection.model';
import { CommandManager } from '../command/command.manager';
import { Model } from '../infrastructure/model';

export declare class ClipboardView extends View {
	constructor(model: Model, commandManager: CommandManager);
	buildTable(data: any[]): any;
	selectTable(element: any): any;
}

