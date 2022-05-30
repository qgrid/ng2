import { Table } from '../dom/table';
import { Event } from '../event/event';
import { GridLet } from '../grid/grid.let';
import { GridService } from '../grid/grid.service';
import { Model } from '../model/model';
import { ObservableLike } from '../rx/rx';

export interface GridPlugin {
    readonly model: Model;
    readonly table: Table;
    readonly view: GridLet;
    readonly service: GridService;

    observe<TState>(event: Event<TState>): ObservableLike<TState>;
    observeReply<TState>(event: Event<TState>): ObservableLike<TState>;
}
