import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { navigationContextFactory } from '../navigation/navigation.context.factory';

export const NAVIGATION_GO_LEFT_COMMAND_KEY = commandKey('navigation.go.left.command');

export class NavigationGoLeftCommand extends Command {
    constructor(plugin, nav, site) {
        const { model } = plugin;
        const context = navigationContextFactory(model);

        super({
            key: NAVIGATION_GO_LEFT_COMMAND_KEY,
            shortcut: model.navigation().shortcut.left,
            canExecute: () => {
                if (nav.isActive()) {
                    const newColumn = site.prevColumn;
                    return newColumn >= 0 && model.navigation().go.canExecute(context('left', { newColumn }));
                }

                return false;
            },
            execute: () => {
                const newRow = site.currentRow;
                const newColumn = site.prevColumn;
                return model.navigation().go.execute(context('left', { newRow, newColumn })) && nav.gotTo(newRow, newColumn);
            }
        });
    }
}
