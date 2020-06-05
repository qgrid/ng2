import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { navigationContextFactory } from '../navigation/navigation.context.factory';

export const NAVIGATION_GO_UP_COMMAND_KEY = commandKey('navigation.go.up.command');

export class NavigationGoUpCommand extends Command {
    constructor(plugin, nav, site) {
        const { model } = plugin;
        const context = navigationContextFactory(model);

        super({
            key: NAVIGATION_GO_UP_COMMAND_KEY,
            shortcut: model.navigation().shortcut.up,
            canExecute: () => {
                if (nav.isActive()) {
                    const newRow = site.prevRow;
                    return newRow >= 0 && model.navigation().go.canExecute(context('up', { newRow }));
                }

                return false;
            },
            execute: () => {
                const newRow = site.prevRow;
                const newColumn = site.currentColumn;
                return model.navigation().go.execute(context('up', { newRow, newColumn })) && nav.gotTo(newRow, newColumn);
            }
        });
    }
}
