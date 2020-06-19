import { Command } from '../command/command';
import { SelectionRange } from '../selection/selection.range';
import { SELECTION_RANGE_COMMAND_KEY, SELECTION_SET_COMMAND_KEY } from './command.bag';

export class SelectionRangeCommand extends Command {
    constructor(plugin) {
        const { model, commandPalette } = plugin;
        const selectionRange = new SelectionRange(model);

        super({
            key: SELECTION_RANGE_COMMAND_KEY,
            canExecute: () => {
                return model.selection().mode === 'range';
            },
            execute: (startCell, endCell) => {
                const selectionSet = commandPalette.get(SELECTION_SET_COMMAND_KEY);

                const buildRange = selectionRange.build();
                const range = buildRange(startCell, endCell);

                const commit = selectionSet.execute(range, true);
                commit();
            }
        });
    }
}
