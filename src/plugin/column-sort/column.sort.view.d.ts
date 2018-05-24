import { Model } from '../../core/infrastructure/model';
import { ColumnModel } from '../../core/column-type/column.model';
import { PluginView } from '../plugin.view';

export declare class ColumnSortView extends PluginView {
    constructor(model: Model, context: { element: HTMLElement, column: ColumnModel, iconAsc: string, iconDesc: string, view: any });

    onMouseOver();
    onMouseLeave();
    onClick(): boolean;
}
