import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';
import { GridService } from '../services/grid';
import { Command } from '../command/command';

/**
 * > Under Construction.
 */
export declare class RowDetailsView {
	constructor(model: Model, table: Table, shortcut: { register: (commands: Command[]) => void });

	toggleStatus: Command;
	status(row: any): boolean;
}
