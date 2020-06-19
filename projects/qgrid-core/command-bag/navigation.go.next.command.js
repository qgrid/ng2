import { Command } from '../command/command';
import { navigationContextFactory } from '../navigation/navigation.context.factory';
import { NAVIGATION_GO_NEXT_COMMAND_KEY, NAVIGATION_GO_TO_COMMAND_KEY } from './command.bag';

export class NavigationGoNextCommand extends Command {
    constructor(plugin, nav, site) {
        const { model, commandPalette } = plugin;
        const context = navigationContextFactory(nav);

        super({
            key: NAVIGATION_GO_NEXT_COMMAND_KEY,
            shortcut: model.navigation().shortcut.next,
            canExecute: () => {
                const newRow = site.nextRow;
                const newColumn = site.nextColumn;
                const hasNextColumn = newColumn >= 0;
                const hasNextRow = newRow >= 0;
                const goTo = commandPalette.get(NAVIGATION_GO_TO_COMMAND_KEY);

                return (hasNextColumn || hasNextRow)
                    && model.navigation().go.canExecute(context('next', { newRow, newColumn }))
                    && goTo.canExecute({ rowIndex: newRow, columnIndex: newColumn });
            },
            execute: () => {
                const nextColumn = site.nextColumn;
                const hasNextColumn = nextColumn >= 0;
                const newRow = hasNextColumn ? site.currentRow : site.nextRow;
                const newColumn = hasNextColumn ? nextColumn : site.firstColumn;
                const goTo = commandPalette.get(NAVIGATION_GO_TO_COMMAND_KEY);

                return model.navigation().go.execute(context('next', { newRow, newColumn })) !== true
                    && goTo.execute({ rowIndex: newRow, columnIndex: newColumn });
            }
        });
    }
}
