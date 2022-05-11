import { Table } from '../dom/table';
import { CommandManager } from './command.manager';

export class TableCommandManager extends CommandManager {
  constructor(
		apply: (f: () => void) => void,
		table: Table
	);
}
