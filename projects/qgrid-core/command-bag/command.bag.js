import { GridInvalidateCommand } from './grid.invalidate.command';
import { GridBusyCommand } from './grid.busy.command';

export class CommandBag {
    constructor(plugin) {
        const { commandPalette } = plugin;

        commandPalette.register(new GridInvalidateCommand(plugin));
        commandPalette.register(new GridBusyCommand(plugin));
    }
}