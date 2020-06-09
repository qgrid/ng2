import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { SelectionRange } from '../selection/selection.range';
import { SELECTION_SET_COMMAND_KEY } from './selection.set.command';

export const SELECTION_RANGE_COMMAND_KEY = commandKey('selection.range.command');

export class SelectionRangeCommand extends Command {
    constructor(plugin) {
        const { model, commandPalette } = plugin;
        const selectionSet = commandPalette.get(SELECTION_SET_COMMAND_KEY);
        const selectionRange = new SelectionRange(model);

        super({
            key: SELECTION_RANGE_COMMAND_KEY,
            canExecute: () => {
                return model.selection().mode === 'range';
            },
            execute: (startCell, endCell) => {
                const buildRange = selectionRange.build();
                const range = buildRange(startCell, endCell);

                const commit = selectionSet.execute(range, true);
                commit();
            }
        });
    }
}
