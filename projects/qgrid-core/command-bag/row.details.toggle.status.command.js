import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { takeOnce, filter } from '../rx/rx.operators';
import { toggleStatus } from '../row-details/row.details.service';
import { selectRow } from '../navigation/navigation.state.selector';

export const ROW_DETAILS_TOGGLE_STATUS_COMMAND_KEY = commandKey('row.details.toggle.status.command');

export class RowDetailsToggleStatusCommand extends Command {
    constructor(plugin) {
        const { model } = plugin;

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
                if (toggle.execute({ row }) !== false) {
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
                                const index = model.view().rows.indexOf(row)
                                model.focus({
                                    rowIndex: index + 1
                                }, {
                                    source: 'row.details.toggle.status'
                                });
                            }
                        });
                }
            },
        });
    }
}
