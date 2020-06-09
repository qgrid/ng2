import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { SELECTION_SET_COMMAND_KEY } from './selection.set.command';

export const SELECTION_ALL_TOGGLE_COMMAND_KEY = commandKey('selection.all.toggle.command');

export class SelectionAllToggleCommand extends Command {
    constructor(plugin) {
        const { model, table, commandPalette } = plugin;
        const setSelection = commandPalette.get(SELECTION_SET_COMMAND_KEY);

        super({
            key: SELECTION_ALL_TOGGLE_COMMAND_KEY,
            shortcut: model.selection().shortcut.selectAll,
            canExecute: () => {
                const { mode } = model.selection();
                return mode === 'multiple' || mode === 'range';
            },
            execute: () => {
                let entries = [];
                switch (model.selection().unit) {
                    case 'row': {
                        entries = table.data.rows();
                        break;
                    }
                    case 'column': {
                        entries = model.columnList().line;
                        break;
                    }
                    case 'cell':
                    case 'mix': {
                        const { body } = table;

                        const buildRange = this.selectionRange.build();
                        const startCell = body.cell(0, 0);
                        const endCell = body.cell(table.data.rows().length, table.data.columns().length);

                        entries = buildRange(startCell, endCell);
                        break;
                    }
                    default: {
                        throw new GridError(
                            'selection.all.toggle',
                            `Invalid unit ${model.selection().unit}`
                        );
                    }
                }

                const commit = setSelection.execute([entries, true]);
                commit();
            },
        });
    }
}
