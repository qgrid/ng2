import { CommandManager } from './command.manager';
import { Table } from '../dom/table';

export class TableCommandManager extends CommandManager {
	constructor(
		apply: (f: () => {}) => void,
		table: Table
	);
}
