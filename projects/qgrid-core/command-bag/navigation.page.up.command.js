import { Command } from '../command/command';
import { navigationContextFactory } from '../navigation/navigation.context.factory';
import { NAVIGATION_PAGE_UP_COMMAND_KEY, NAVIGATION_GO_TO_COMMAND_KEY } from './command.bag';

export class NavigationPageUpCommand extends Command {
    constructor(plugin, nav, site) {
        const { model, table, commandPalette } = plugin;
        const context = navigationContextFactory(nav);

        super({
            key: NAVIGATION_PAGE_UP_COMMAND_KEY,
            shortcut: model.navigation().shortcut.pageUp,
            canExecute: () => {
                if (nav.isActive()) {
                    const newColumn = site.currentColumn;
                    const newRow = site.prevRow;
                    const goTo = commandPalette.get(NAVIGATION_GO_TO_COMMAND_KEY);

                    return newRow >= 0
                        && model.navigation().go.canExecute(context('pageUp', { newRow }))
                        && goTo.canExecute({ rowIndex: newRow, columnIndex: newColumn });
                }

                return false;
            },
            execute: () => {
                const view = table.view;
                const position = nav.position(view.scrollTop() - view.height(), 'up');
                const newRow = position.row;
                const newColumn = site.currentColumn;
                const goTo = commandPalette.get(NAVIGATION_GO_TO_COMMAND_KEY);

                if (model.navigation().go.execute(context('pageUp', { newRow, newColumn })) !== true) {
                    model.scroll({
                        top: position.offset
                    }, {
                        source: 'navigation.page.up.component'
                    });

                    return goTo.execute({
                        rowIndex: newRow,
                        columnIndex: newColumn
                    });
                }

                return true;
            }
        });
    }
}
