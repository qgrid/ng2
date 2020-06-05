import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { navigationContextFactory } from '../navigation/navigation.context.factory';

export const NAVIGATION_GO_HOME_COMMAND_KEY = commandKey('navigation.go.home.command');

export class NavigationGoHomeCommand extends Command {
    constructor(plugin, nav, site) {
        const { model } = plugin;
        const context = navigationContextFactory(model);

        super({
            key: NAVIGATION_GO_HOME_COMMAND_KEY,
            shortcut: model.navigation().shortcut.home,
            canExecute: () => {
                if (nav.isActive()) {
                    const newColumn = site.prevColumn;
                    return newColumn >= 0 && model.navigation().go.canExecute(context('home', { newColumn }));
                }

                return false;
            },
            execute: () => {
                const newRow = site.currentRow;
                const newColumn = site.firstColumn;
                return model.navigation().go.execute(context('home', { newRow, newColumn })) && nav.gotTo(newRow, newColumn);
            }
        });
    }
}
