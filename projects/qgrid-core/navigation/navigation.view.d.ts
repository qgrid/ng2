import { Command } from '../command/command';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';


export declare class NavigationView {
	constructor(model: Model, table: Table, shortcut: { register: (commands: Command[]) => void });

	focus: Command;
	scrollTo: Command;
}
