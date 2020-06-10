import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { navigationContextFactory } from '../navigation/navigation.context.factory';

export const NAVIGATION_PAGE_DOWN_COMMAND_KEY = commandKey('navigation.page.down.command');

export class NavigationPageDownCommand extends Command {
    constructor(plugin, nav, site) {
        const { model, table } = plugin;
        const context = navigationContextFactory(nav);

        super({
            key: NAVIGATION_PAGE_DOWN_COMMAND_KEY,
            shortcut: model.navigation().shortcut.pageDown,
            canExecute: () => {
                if (nav.isActive()) {
                    const newRow = site.nextRow;
                    return newRow >= 0 && model.navigation().go.canExecute(context('pageDown', { newRow }));
                }

                return false;
            },
            execute: () => {
                const { view } = table;
                const position = nav.position(view.scrollTop() + view.height(), 'down');
                const newRow = position.row;
                const newColumn = site.currentColumn;
                if (model.navigation().go.execute(context('pageDown', { newRow, newColumn })) !== true) {
                    model.scroll({
                        top: position.offset
                    }, {
                        source: 'navigation.page.down.command'
                    });

                    return nav.goTo(
                        position.row,
                        site.currentColumn,
                        'navigation.scroll'
                    );
                }

                return true;
            }
        });
    }
}
