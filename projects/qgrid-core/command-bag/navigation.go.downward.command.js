import { Command } from '../command/command';
import { navigationContextFactory } from '../navigation/navigation.context.factory';
import { NAVIGATION_GO_DOWNWARD_COMMAND_KEY, NAVIGATION_GO_TO_COMMAND_KEY } from './command.bag';

export class NavigationGoDownwardCommand extends Command {
    constructor(plugin, nav, site) {
        const { model, commandPalette } = plugin;
        const context = navigationContextFactory(nav);

        super({
            key: NAVIGATION_GO_DOWNWARD_COMMAND_KEY,
            shortcut: model.navigation().shortcut.downward,
            canExecute: () => {
                if (nav.isActive()) {
                    const newRow = site.nextRow;
                    const newColumn = site.currentColumn;
                    const goTo = commandPalette.get(NAVIGATION_GO_TO_COMMAND_KEY);
                    return newRow >= 0
                        && model.navigation().go.canExecute(context('downward', { newRow }))
                        && goTo.canExecute({ rowIndex: newRow, columnIndex: newColumn });
                }

                return false;
            },
            execute: () => {
                const newRow = site.lastRow;
                const newColumn = site.currentColumn;
                const goTo = commandPalette.get(NAVIGATION_GO_TO_COMMAND_KEY);
                return model.navigation().go.execute(context('downward', { newRow, newColumn })) !== true
                    && goTo.execute({ rowIndex: newRow, columnIndex: newColumn });
            }
        });
    }
}
