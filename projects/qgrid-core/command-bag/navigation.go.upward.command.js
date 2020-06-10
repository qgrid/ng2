import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { navigationContextFactory } from '../navigation/navigation.context.factory';

export const NAVIGATION_GO_UPWARD_COMMAND_KEY = commandKey('navigation.go.upward.command');

export class NavigationGoUpwardCommand extends Command {
    constructor(plugin, nav, site) {
        const { model } = plugin;
        const context = navigationContextFactory(nav);

        super({
            key: NAVIGATION_GO_UPWARD_COMMAND_KEY,
            shortcut: model.navigation().shortcut.upward,
            canExecute: () => {
                if (nav.isActive()) {
                    const newRow = site.prevRow;
                    return newRow >= 0 && model.navigation().go.canExecute(context('upward', { newRow }));
                }

                return false;
            },
            execute: () => {
                const newRow = site.firstRow;
                const newColumn = site.currentColumn;
                return model.navigation().go.execute(context('upward', { newRow, newColumn })) !== true && nav.goTo(newRow, newColumn);
            }
        });
    }
}
