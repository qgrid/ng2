import { ColumnModel, GridPlugin } from '@qgrid/core';

export declare class ColumnSortPlugin {
	constructor(
        plugin: GridPlugin,
        context: {
            element: HTMLElement;
            column: ColumnModel;
            iconAsc: string;
            iconDesc: string;
        });

	mouseLeave();
	click(): boolean;
}
