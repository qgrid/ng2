import { Model } from '../../core/infrastructure/model'
import { Event } from '../../core/infrastructure/event'
import { Command } from '../../core/command/command';

export declare class ColumnChooserView {
    constructor(model: Model, context: { name: string });

    drop: Command<{ data: number, target: number }>;
    drag: Command<{ data: number }>;
    dragOver: Command<DragEvent>;

    cancelEvent: Event;
    submitEvent: Event;
}