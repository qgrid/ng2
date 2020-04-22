import { Model } from '@qgrid/core/infrastructure/model';
import { ColumnModel } from '@qgrid/core/column-type/column.model';

export declare class ColumnSortPlugin {
    constructor(
        model: Model,
        context: {
            element: HTMLElement,
            column: ColumnModel,
            iconAsc: string,
            iconDesc: string,
            view: any
        });

    onMouseOver();
    onMouseLeave();
    onClick(): boolean;
}
