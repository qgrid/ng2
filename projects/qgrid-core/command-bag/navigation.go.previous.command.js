import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { navigationContextFactory } from '../navigation/navigation.context.factory';

export const NAVIGATION_GO_PREVIOUS_COMMAND_KEY = commandKey('navigation.go.previous.command');

export class NavigationGoPreviousCommand extends Command {
    constructor(plugin, nav, site) {
        const { model } = plugin;
        const context = navigationContextFactory(nav);

        super({
            key: NAVIGATION_GO_PREVIOUS_COMMAND_KEY,
            shortcut: model.navigation().shortcut.previous,
            canExecute: () => {
                const newColumn = site.prevColumn;
                const newRow = site.prevRow;
                const hasPrevColumn = newColumn >= 0;
                const hasPrevRow = newRow >= 0;
                return (hasPrevColumn || hasPrevRow) && model.navigation().go.canExecute(context('previous', { newRow, newColumn }));
            },
            execute: () => {
                const prevColumn = site.prevColumn;
                const hasPrevColumn = prevColumn >= 0;
                const newColumn = hasPrevColumn ? prevColumn : site.lastColumn;
                const newRow = hasPrevColumn ? site.currentRow : site.prevRow;
                return model.navigation().go.execute(context('previous', { newRow, newColumn })) !== true && nav.goTo(newRow, newColumn);
            }
        });
    }
}
