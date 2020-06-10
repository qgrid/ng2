import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { navigationContextFactory } from '../navigation/navigation.context.factory';

export const NAVIGATION_GO_RIGHT_COMMAND_KEY = commandKey('navigation.go.right.command');

export class NavigationGoRightCommand extends Command {
    constructor(plugin, nav, site) {
        const { model } = plugin;
        const context = navigationContextFactory(nav);

        super({
            key: NAVIGATION_GO_RIGHT_COMMAND_KEY,
            shortcut: model.navigation().shortcut.right,
            canExecute: () => {
                if (nav.isActive()) {
                    const newColumn = site.nextColumn;
                    return newColumn >= 0 && model.navigation().go.canExecute(context('right', { newColumn })) === true;
                }

                return false;
            },
            execute: () => {
                const newRow = site.currentRow;
                const newColumn = site.nextColumn;
                return model.navigation().go.execute(context('right', { newRow, newColumn })) !== true && nav.goTo(newRow, newColumn);
            }
        });
    }
}
