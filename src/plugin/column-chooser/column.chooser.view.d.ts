import { Model } from '../../core/infrastructure/model'
import { Event } from '../../core/infrastructure/event'
import { Command } from '../../core/command/command';

export declare class ColumnChooserView {
    constructor(model: Model, context: { name: string });

    drag: Command<{ data: string }>;
    dragOver: Command<DragEvent>;
    dropFactory: (key: string) => Command<{ data: string, target: string }>;

    cancelEvent: Event;
    submitEvent: Event;
}