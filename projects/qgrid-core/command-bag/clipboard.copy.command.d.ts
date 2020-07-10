import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const CLIPBOARD_COPY_COMMAND_KEY: CommandKey<any>;

export declare class ClipboardCopyCommand extends Command<any> {
    constructor(plugin: GridPlugin);
}

