import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';
import { Navigation } from '../navigation/navigation';
import { NavigationSite } from '../navigation/navigation.site';
import { CellViewPosition } from '../scene/view/cell.view';

export declare class NavigationGoToCommand extends Command<CellViewPosition> {
    constructor(
        plugin: GridPlugin,
        nav: Navigation,
        site: NavigationSite
    );
}

