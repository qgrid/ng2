import { CommandBagRegistry } from '../command-bag/command.bag.registry';

export class CommandLet {
    constructor(plugin) {
        this.registry = new CommandBagRegistry(plugin);
    }
}