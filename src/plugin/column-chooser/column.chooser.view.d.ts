import { Model } from '../../core/infrastructure/model'
import { Event } from '../../core/infrastructure/event'
import { Command } from '../../core/command/command';

export declare class ColumnChooserView {
    constructor(model: Model, context: { name: string });

    drag: Command<{ dragData: string }>;
    drop: Command<{ dragData: string, dropData: string }>;

    cancelEvent: Event;
    submitEvent: Event;
    dropEvent: Event;
}