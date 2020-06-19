import { Command } from '../command/command';
import { navigationContextFactory } from '../navigation/navigation.context.factory';
import { NAVIGATION_GO_LEFT_COMMAND_KEY, NAVIGATION_GO_TO_COMMAND_KEY } from './command.bag';

export class NavigationGoLeftCommand extends Command {
    constructor(plugin, nav, site) {
        const { model, commandPalette } = plugin;
        const context = navigationContextFactory(nav);

        super({
            key: NAVIGATION_GO_LEFT_COMMAND_KEY,
            shortcut: model.navigation().shortcut.left,
            canExecute: () => {
                if (nav.isActive()) {
                    const newRow = site.currentRow;
                    const newColumn = site.prevColumn;
                    const goTo = commandPalette.get(NAVIGATION_GO_TO_COMMAND_KEY);
                    
                    return newColumn >= 0 
                    && model.navigation().go.canExecute(context('left', { newColumn }))
                    && goTo.canExecute({ rowIndex: newRow, columnIndex: newColumn });
                }

                return false;
            },
            execute: () => {
                const newRow = site.currentRow;
                const newColumn = site.prevColumn;
                const goTo = commandPalette.get(NAVIGATION_GO_TO_COMMAND_KEY);

                return model.navigation().go.execute(context('left', { newRow, newColumn })) !== true
                    && goTo.execute({ rowIndex: newRow, columnIndex: newColumn });
            }
        });
    }
}
