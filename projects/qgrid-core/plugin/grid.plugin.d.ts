import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';
import { GridView } from '../grid/grid.view';

export interface GridPlugin {
    readonly model: Model;
    readonly table: Table;
    readonly view: GridView;
}
