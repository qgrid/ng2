import {CompositeCommandManager} from '../infrastructure/composite.command.manager';
import {Model} from "../infrastructure/model";
import {CommandManager} from "../infrastructure/command.manager";

export class SelectionCommandManager extends CompositeCommandManager {
	constructor(public model: Model, manager: CommandManager);
}