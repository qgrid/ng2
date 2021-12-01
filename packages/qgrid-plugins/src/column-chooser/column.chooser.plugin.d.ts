import { Command, Event, GridPlugin, Node } from '@qgrid/core';

export declare class ColumnChooserPlugin {
    constructor(plugin: GridPlugin, context: { name: string });

    drag: Command<{ dragData: string }>;
    drop: Command<{ dragData: string, dropData: string }>;

    treeView: Node;
    cancelEvent: Event;
    submitEvent: Event;
    dropEvent: Event;

    search(value: string): void;
}