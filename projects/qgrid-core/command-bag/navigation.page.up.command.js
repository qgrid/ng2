import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { navigationContextFactory } from '../navigation/navigation.context.factory';

export const NAVIGATION_PAGE_UP_COMMAND_KEY = commandKey('navigation.page.up.command');

export class NavigationPageUpCommand extends Command {
    constructor(plugin, nav, site) {
        const { model, table } = plugin;
        const context = navigationContextFactory(nav);

        super({
            key: NAVIGATION_PAGE_UP_COMMAND_KEY,
            shortcut: model.navigation().shortcut.pageUp,
            canExecute: () => {
                if (nav.isActive()) {
                    const newRow = site.prevRow;
                    return newRow >= 0 && model.navigation().go.canExecute(context('pageUp', { newRow }));
                }

                return false;
            },
            execute: () => {
                const view = table.view;
                const position = nav.position(view.scrollTop() - view.height(), 'up');
                const newRow = position.row;
                const newColumn = site.currentColumn;
                if (model.navigation().go.execute(context('pageUp', { newRow, newColumn })) !== true) {
                    model.scroll({
                        top: position.offset
                    }, {
                        source: 'navigation.page.up.component'
                    });

                    return nav.goTo(
                        newRow,
                        newColumn,
                        'navigation.scroll'
                    );
                }

                return true;
            }
        });
    }
}
