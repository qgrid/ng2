import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { navigationContextFactory } from '../navigation/navigation.context.factory';

export const NAVIGATION_GO_DOWN_COMMAND_KEY = commandKey('navigation.go.down.command');

export class NavigationGoDownCommand extends Command {
    constructor(plugin, nav, site) {
        const { model } = plugin;
        const context = navigationContextFactory(model);

        super({
            key: NAVIGATION_GO_DOWN_COMMAND_KEY,
            shortcut: model.navigation().shortcut.down,
            canExecute: () => {
                if (nav.isActive()) {
                    const newRow = site.nextRow;
                    return newRow >= 0 && model.navigation().go.canExecute(context('down', { newRow }));
                }

                return false;
            },
            execute: () => {
                const newRow = site.nextRow;
                const newColumn = site.currentColumn;
                return model.navigation().go.execute(context('down', { newRow, newColumn })) && nav.gotTo(newRow, newColumn);
            }
        });
    }
}
