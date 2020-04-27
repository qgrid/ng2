import { Model, ModelEvent } from '../infrastructure/model';
import { Table } from '../dom/table';
import { GridView } from '../grid/grid.view';
import { ObservableLike } from '../infrastructure/rx';

export interface GridPlugin {
    readonly model: Model;
    readonly table: Table;
    readonly view: GridView;

    readonly observe: <TState>(event: ModelEvent<TState>) => ObservableLike<TState>;
    readonly observeReply: <TState>(event: ModelEvent<TState>) => ObservableLike<TState>;
}
