import { Command } from '../command/command';
import { navigationContextFactory } from '../navigation/navigation.context.factory';
import { NAVIGATION_PAGE_DOWN_COMMAND_KEY, NAVIGATION_GO_TO_COMMAND_KEY } from './command.bag';

export class NavigationPageDownCommand extends Command {
    constructor(plugin, nav, site) {
        const { model, table, commandPalette } = plugin;
        const context = navigationContextFactory(nav);

        super({
            key: NAVIGATION_PAGE_DOWN_COMMAND_KEY,
            shortcut: model.navigation().shortcut.pageDown,
            canExecute: () => {
                if (nav.isActive()) {
                    const newRow = site.nextRow;
                    const newColumn = site.currentColumn;
                    const goTo = commandPalette.get(NAVIGATION_GO_TO_COMMAND_KEY);

                    return newRow >= 0 
                    && model.navigation().go.canExecute(context('pageDown', { newRow }));
                }

                return false;
            },
            execute: () => {
                const { view } = table;
                const position = nav.position(view.scrollTop() + view.height(), 'down');
                const newRow = position.row;
                const newColumn = site.currentColumn;
                const goTo = commandPalette.get(NAVIGATION_GO_TO_COMMAND_KEY);

                if (model.navigation().go.execute(context('pageDown', { newRow, newColumn })) !== true) {
                    model.scroll({
                        top: position.offset
                    }, {
                        source: 'navigation.page.down.command'
                    });

                    return goTo.execute({
                        rowIndex: position.row,
                        columnIndex: site.currentColumn
                    });
                }

                return true;
            }
        });
    }
}
