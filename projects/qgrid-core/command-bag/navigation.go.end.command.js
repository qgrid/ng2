import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { navigationContextFactory } from '../navigation/navigation.context.factory';

export const NAVIGATION_GO_END_COMMAND_KEY = commandKey('navigation.go.end.command');

export class NavigationGoEndCommand extends Command {
    constructor(plugin, nav, site) {
        const { model } = plugin;
        const context = navigationContextFactory(model);

        super({
            key: NAVIGATION_GO_END_COMMAND_KEY,
            shortcut: model.navigation().shortcut.end,
            canExecute: () => {
                if (nav.isActive()) {
                    const newColumn = site.newColumn;
                    return newColumn >= 0 && model.navigation().go.canExecute(context('end', { newColumn }));
                }

                return false;
            },
            execute: () => {
                const newRow = site.currentRow;
                const newColumn = site.lastColumn;
                return model.navigation().go.execute(context('end', { newRow, newColumn })) && nav.gotTo(newRow, newColumn);
            }
        });
    }
}
