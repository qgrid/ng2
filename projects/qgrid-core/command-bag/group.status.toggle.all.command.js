import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { PipeUnit } from '../pipe/pipe.unit';
import { preOrderDFS } from '../node/node.service';

export const GROUP_STATUS_TOGGLE_ALL_COMMAND_KEY = commandKey('group.status.toggle.all.command');

export class GroupStatusToggleAllCommand extends Command {
    constructor(plugin) {
        const { model } = plugin;

        let shouldExpand = true;
        super({
            key: GROUP_STATUS_TOGGLE_ALL_COMMAND_KEY,
            canExecute: () => {
                const { toggleAll } = model.group();
                return toggleAll.canExecute() === true;
            },
            execute: () => {
                const { toggleAll } = model.group();
                if (toggleAll.execute() !== false) {
                    const { nodes } = model.view();
                    const { toggle } = model.group();

                    preOrderDFS(nodes, node => {
                        if (toggleStatus.canExecute([node])) {
                            if (toggle.execute(node) !== false) {
                                node.state.expand = shouldExpand;
                            }
                        }
                    });

                    shouldExpand = !shouldExpand;

                    service.invalidate({
                        source: 'group.status.toggle.all.command',
                        pipe: PipeUnit.group,
                        why: PipeUnit.group.why
                    });

                    return true
                }

                return false;
            }
        });
    }
}
