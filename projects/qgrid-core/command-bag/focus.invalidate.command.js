import { Command } from '../command/command';
import { FOCUS_INVALIDATE_COMMAND_KEY } from './command.bag';
import { Fastdom } from '../services/fastdom';
import { GRID_PREFIX } from '../definition';
import { selectRowIndex, selectColumnIndex } from '../navigation/navigation.state.selector';

export class FocusInvalidateCommand extends Command {
    constructor(plugin) {
        const { model, table } = plugin;
        let dispose = [];

        super({
            key: FOCUS_INVALIDATE_COMMAND_KEY,
            execute: () => {
                dispose.forEach(f => f());
                dispose = [];

                const navState = model.navigation();
                const rowIndex = selectRowIndex(navState);
                const columnIndex = selectColumnIndex(navState);
                const cell = table.body.cell(rowIndex, columnIndex);
                if (cell.model()) {
                    const row = table.body.row(rowIndex);

                    Fastdom.mutate(() => {
                        cell.addClass(`${GRID_PREFIX}-focused`);
                        row.addClass(`${GRID_PREFIX}-focused`);
                    });

                    dispose.push(() =>
                        Fastdom.mutate(() => {
                            cell.removeClass(`${GRID_PREFIX}-focused`);
                            row.removeClass(`${GRID_PREFIX}-focused`);
                        })
                    );
                }
            }
        });
    }
}
