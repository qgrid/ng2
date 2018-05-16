import { Model } from '../../core/infrastructure/model';
import { PluginView } from '../plugin.view';

export declare class ColumnSortView extends PluginView {
    constructor(model: Model, context: any);
    onMouseOver();
    onMouseLeave();
    onClick(): boolean;
}
