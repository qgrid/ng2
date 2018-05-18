import { View } from '../view/view';
import { CommandManager } from '../command/command.manager';
import { Model } from '../infrastructure/model';
import { Table } from 'ng2-qgrid/core/dom/table';

export declare class ClipboardView extends View {
	constructor(model: Model, table: Table, commandManager: CommandManager);
}
