import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';
import { Navigation } from '../navigation/navigation';
import { NavigationSite } from '../navigation/navigation.site';

export declare const NAVIGATION_PAGE_UP_COMMAND_KEY: CommandKey<any>;

export declare class NavigationPageUpCommand extends Command<any> {
    constructor(
        plugin: GridPlugin,
        nav: Navigation,
        site: NavigationSite
    );
}

