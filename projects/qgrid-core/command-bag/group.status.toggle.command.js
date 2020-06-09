import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { PipeUnit } from '../pipe/pipe.unit';
import { selectRow, selectColumn } from '../navigation/navigation.state.selector';

export const GROUP_STATUS_TOGGLE_COMMAND_KEY = commandKey('group.status.toggle.command');

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
                    service.invalidate({
                        source: 'group.status.toggle.command',
                        pipe: PipeUnit.group,
                        why: PipeUnit.group.why
                    });

                    return true;
                }

                return false;
            },
        });
    }
}
