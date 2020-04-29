import { Event } from '@qgrid/core/event/event'
import { Command } from '@qgrid/core/command/command';
import { Node } from '@qgrid/core/node/node';
import { GridPlugin } from '@qgrid/core/plugin/grid.plugin';

export declare class ColumnChooserPlugin {
    constructor(plugin: GridPlugin, context: { name: string });

    drag: Command<{ dragData: string }>;
    drop: Command<{ dragData: string, dropData: string }>;

    treeView: Node;
    cancelEvent: Event;
    submitEvent: Event;
    dropEvent: Event;

    search(value: string);
}