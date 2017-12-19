import { GridModel } from '../../core/infrastructure/model';
import { PluginView } from '../plugin.view';

export declare class ColumnSortView extends PluginView {
    constructor(model: GridModel, context: any);
    onMouseOver();
    onMouseLeave();
    onClick();
}
