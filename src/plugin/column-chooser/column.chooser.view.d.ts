import { Model } from '../../core/infrastructure/model'
import { Event } from '../../core/infrastructure/event'
import { Command } from '../../core/command/command';
import { Node } from '../../core/node/node';

export declare class ColumnChooserView {
    constructor(model: Model, context: { name: string });

    drag: Command<{ dragData: string }>;
    drop: Command<{ dragData: string, dropData: string }>;

    tree: Node;
    cancelEvent: Event;
    submitEvent: Event;
    dropEvent: Event;
}