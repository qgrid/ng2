import { Command } from '../command/command';
import { PipeUnit } from '../pipe/pipe.unit';
import { selectRow, selectColumn } from '../navigation/navigation.state.selector';
import { GROUP_STATUS_TOGGLE_COMMAND_KEY, GRID_INVALIDATE_COMMAND_KEY } from './command.bag';

export class GroupStatusToggleCommand extends Command {
    constructor(plugin) {
        const { model, view } = plugin;

        super({
            key: GROUP_STATUS_TOGGLE_COMMAND_KEY,
            shortcut: model.group().shortcut.toggle,
            canExecute: args => {
                const groupLet = view.group;
                const navState = model.navigation();
                const { toggle } = model.group();

                let row = (args && args[0]) || selectRow(navState);
                let column = (args && args[1]) || selectColumn(navState);

                const node = groupLet.getNode(row, column);
                return node
                    && node.type === 'group'
                    && toggle.canExecute(node) === true;
            },
            execute: args => {
                const groupLet = view.group;
                const navState = model.navigation();
                const { toggle } = model.group();

                let row = (args && args[0]) || selectRow(navState);
                let column = (args && args[1]) || selectColumn(navState);

                const node = groupLet.getNode(row, column);
                if (toggle.execute(node) !== true) {
                    node.state.expand = !node.state.expand;

                    const invalidate = commandPalette.get(GRID_INVALIDATE_COMMAND_KEY);
                    invalidate.execute({
                        source: 'group.status.toggle.command',
                        pipe: PipeUnit.group,
                        why: PipeUnit.group.wh
                    });

                    return true;
                }

                return false;
            },
        });
    }
}
