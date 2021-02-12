import { Command } from '../command/command';
import { takeOnce, filter } from '../rx/rx.operators';
import { toggleStatus } from '../row-details/row.details.service';
import { selectRow } from '../navigation/navigation.state.selector';
import { ROW_DETAILS_TOGGLE_STATUS_COMMAND_KEY, NAVIGATION_GO_TO_COMMAND_KEY } from './command.bag';

export class RowDetailsToggleStatusCommand extends Command {
    constructor(plugin) {
        const { model, commandPalette, observe } = plugin;

        super({
            key: ROW_DETAILS_TOGGLE_STATUS_COMMAND_KEY,
            shortcut: model.row().shortcut.toggle,
            canExecute: row => {
                if (!row) {
                    const { cell } = model.navigation();
                    if (cell && cell.column.type === 'row-expand') {
                        row = cell.row;
                    }
                }

                const { toggle } = model.row();
                return !!row && toggle.canExecute({ row }) === true;
            },
            execute: row => {
                if (!row) {
                    row = selectRow(model.navigation());
                }

                const { toggle, status, mode } = model.row();
                if (toggle.execute({ row }) !== true) {
                    const newStatus = toggleStatus([row], status, mode);
                    model.row({
                        status: newStatus
                    }, {
                        source: 'row.details.toggle.status'
                    });

                    observe(model.sceneChanged)
                        .pipe(
                            filter(e => e.hasChanges('status') && e.state.status === 'stop'),
                            takeOnce()
                        )
                        .subscribe(e => {
                            const rowStatus = newStatus.get(row);
                            if (rowStatus && rowStatus.expand) {
                                const goTo = commandPalette.get(NAVIGATION_GO_TO_COMMAND_KEY);
                                const rowDetailsIndex = model.view().rows.indexOf(row) + 1;
                                if (goTo.canExecute({ rowIndex: rowDetailsIndex })) {
                                    goTo.execute({ rowIndex: rowDetailsIndex })
                                }
                            }
                        });
                }
            },
        });
    }
}
