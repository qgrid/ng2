import { CommandPalette } from '../command/command.palette';
import { Event } from '../event/event';
import { GridLet } from '../grid/grid.let';
import { Model } from '../model/model';
import { ObservableLike } from '../rx/rx';
import { Table } from '../dom/table';

export interface GridPlugin {
    readonly commandPalette: CommandPalette;
    readonly model: Model;
    readonly table: Table;
    readonly view: GridLet;

    observe<TState>(event: Event<TState>): ObservableLike<TState>;
    observeReply<TState>(event: Event<TState>): ObservableLike<TState>;
}
