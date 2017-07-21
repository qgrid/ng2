import {CompositeCommandManager} from '../infrastructure/composite.command.manager';
import {CommandManager} from '../infrastructure/command.manager';

export class SelectionCommandManager extends CompositeCommandManager {
	constructor(manager: CommandManager);
}
