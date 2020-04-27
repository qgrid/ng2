import { Model } from '@qgrid/core/infrastructure/model';
import { ColumnModel } from '@qgrid/core/column-type/column.model';
import { GridPlugin } from '@qgrid/core/plugin/grid.plugin';

export declare class ColumnSortPlugin {
    constructor(
        plugin: GridPlugin,
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
