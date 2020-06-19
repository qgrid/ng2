import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';
import { Navigation } from '../navigation/navigation';
import { NavigationSite } from '../navigation/navigation.site';

export declare class NavigationGoEndCommand extends Command<any> {
    constructor(
        plugin: GridPlugin,
        nav: Navigation,
        site: NavigationSite
    );
}

