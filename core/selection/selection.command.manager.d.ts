import {CompositeCommandManager} from '../command/composite.command.manager';
import {CommandManager} from '../command/command.manager';

export class SelectionCommandManager extends CompositeCommandManager {
	constructor(manager: CommandManager);
}
