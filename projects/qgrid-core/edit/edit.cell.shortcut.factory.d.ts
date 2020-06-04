import { GridPlugin } from '../plugin/grid.plugin';

export declare function editCellShortcutFactory(plugin: GridPlugin):
    (action: string) => () => string;