import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { navigationContextFactory } from '../navigation/navigation.context.factory';

export const NAVIGATION_GO_DOWNWARD_COMMAND_KEY = commandKey('navigation.go.downward.command');

export class NavigationGoDownwardCommand extends Command {
    constructor(plugin, nav, site) {
        const { model } = plugin;
        const context = navigationContextFactory(model);

        super({
            key: NAVIGATION_GO_DOWNWARD_COMMAND_KEY,
            shortcut: model.navigation().shortcut.downward,
            canExecute: () => {
                if (nav.isActive()) {
                    const newRow = site.nextRow;
                    return newRow >= 0 && model.navigation().go.canExecute(context('downward', { newRow }));
                }

                return false;
            },
            execute: () => {
                const newRow = site.lastRow;
                const newColumn = site.currentColumn;
                return model.navigation().go.execute(context('downward', { newRow, newColumn })) && nav.gotTo(newRow, newColumn);
            }
        });
    }
}
