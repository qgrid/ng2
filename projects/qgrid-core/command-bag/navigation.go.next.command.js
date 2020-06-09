import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { navigationContextFactory } from '../navigation/navigation.context.factory';

export const NAVIGATION_GO_NEXT_COMMAND_KEY = commandKey('navigation.go.next.command');

export class NavigationGoNextCommand extends Command {
    constructor(plugin, nav, site) {
        const { model } = plugin;
        const context = navigationContextFactory(model);

        super({
            key: NAVIGATION_GO_NEXT_COMMAND_KEY,
            shortcut: model.navigation().shortcut.next,
            canExecute: () => {
                const newRow = site.nextRow;
                const newColumn = site.newColumn;
                const hasNextColumn = newColumn >= 0;
                const hasNextRow = newRow >= 0;
                return (hasNextColumn || hasNextRow) && model.navigation().go.canExecute(context('next', { newRow, newColumn }));
            },
            execute: () => {
                const nextColumn = site.newColumn;
                const hasNextColumn = nextColumn >= 0;
                const newRow = hasNextColumn ? site.currentRow : site.nextRow;
                const newColumn = hasNextColumn ? nextColumn : site.firstColumn;

                return model.navigation().go.execute(context('next', { newRow, newColumn })) && nav.gotTo(newRow, newColumn);
            }
        });
    }
}
