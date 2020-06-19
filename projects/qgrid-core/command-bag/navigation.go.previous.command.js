import { Command } from '../command/command';
import { navigationContextFactory } from '../navigation/navigation.context.factory';
import { NAVIGATION_GO_PREVIOUS_COMMAND_KEY, NAVIGATION_GO_TO_COMMAND_KEY } from './command.bag';

export class NavigationGoPreviousCommand extends Command {
    constructor(plugin, nav, site) {
        const { model, commandPalette } = plugin;
        const context = navigationContextFactory(nav);

        super({
            key: NAVIGATION_GO_PREVIOUS_COMMAND_KEY,
            shortcut: model.navigation().shortcut.previous,
            canExecute: () => {
                const newColumn = site.prevColumn;
                const newRow = site.prevRow;
                const hasPrevColumn = newColumn >= 0;
                const hasPrevRow = newRow >= 0;
                const goTo = commandPalette.get(NAVIGATION_GO_TO_COMMAND_KEY);

                return (hasPrevColumn || hasPrevRow)
                    && model.navigation().go.canExecute(context('previous', { newRow, newColumn }))
                    && goTo.canExecute({ rowIndex: newRow, columnIndex: newColumn });
            },
            execute: () => {
                const prevColumn = site.prevColumn;
                const hasPrevColumn = prevColumn >= 0;
                const newColumn = hasPrevColumn ? prevColumn : site.lastColumn;
                const newRow = hasPrevColumn ? site.currentRow : site.prevRow;
                const goTo = commandPalette.get(NAVIGATION_GO_TO_COMMAND_KEY);

                return model.navigation().go.execute(context('previous', { newRow, newColumn })) !== true
                    && goTo.execute({ rowIndex: newRow, columnIndex: newColumn });
            }
        });
    }
}
