import { Model } from '@qgrid/core/infrastructure/model'
import { Event } from '@qgrid/core/infrastructure/event'
import { Command } from '@qgrid/core/command/command';
import { Node } from '@qgrid/core/node/node';

export declare class ColumnChooserPlugin {
    constructor(model: Model, context: { name: string });

    drag: Command<{ dragData: string }>;
    drop: Command<{ dragData: string, dropData: string }>;

    treeView: Node;
    cancelEvent: Event;
    submitEvent: Event;
    dropEvent: Event;

    search(value: string);
}