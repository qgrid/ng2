import { PluginView } from '../plugin.view';
import { Model } from '../../core/infrastructure/model'
import { Event } from '../../core/infrastructure/event'

export declare class ColumnChooserView extends PluginView {
    constructor(model: Model, context: any);
    cancelEvent: Event;
    submitEvent: Event;
}