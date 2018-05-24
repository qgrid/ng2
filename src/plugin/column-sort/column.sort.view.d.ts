import { Model } from '../../core/infrastructure/model';
import { ColumnModel } from '../../core/column-type/column.model';

export declare class ColumnSortView {
    constructor(model: Model, context: { element: HTMLElement, column: ColumnModel, iconAsc: string, iconDesc: string, view: any });

    onMouseOver();
    onMouseLeave();
    onClick(): boolean;
}
