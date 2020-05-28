import { Model } from '../model/model';
import { Table } from '../dom/table';
import { GridLet } from '../grid/grid.let';
import { ObservableLike } from '../rx/rx';
import { Event } from '../event/event';
import { GridService } from '../grid/grid.service';

export interface GridPlugin {
    readonly model: Model;
    readonly table: Table;
    readonly view: GridLet;
    readonly service: GridService;

    observe<TState>(event: Event<TState>): ObservableLike<TState>;
    observeReply<TState>(event: Event<TState>): ObservableLike<TState>;
}
