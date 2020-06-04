import { ClipboardCopyCommand } from '../command-bag/clipboard.copy.command';

export class ClipboardLet {
    constructor(plugin) {
        const { model, table, commandPalette } = plugin;

        this.copy = new ClipboardCopyCommand(plugin);
        commandPalette.register(this.copy);
    }
}
