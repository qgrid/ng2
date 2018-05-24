import { Model } from '../../core/infrastructure/model'
import { Event } from '../../core/infrastructure/event'

export declare class ColumnChooserView {
    constructor(model: Model, context: { name: string });

    cancelEvent: Event;
    submitEvent: Event;
}