import { calk, find, findLeaves, preOrderDFS } from '../node/node.service';
import { Command } from '../command/command';
import { eventPath } from '../services/dom';
import { GRID_PREFIX } from '../definition';
import { PathService } from '../path/path.service';
import { COLUMN_DROP_COMMAND_KEY } from './command.bag';

export class ColumnDropCommand extends Command {
    constructor(plugin) {
        const { table, model } = plugin;
        const pathFinder = new PathService(table.box.bag.head);

        super({
            key: COLUMN_DROP_COMMAND_KEY,
            canExecute: e => {
                if (e.action === 'end') {
                    return true;
                }

                const cell = pathFinder.cell(eventPath(e));
                return cell && cell.column.canMove;
            },
            execute: e => {
                const sourceKey = e.dragData;
                switch (e.action) {
                    case 'over': {
                        const th = pathFinder.cell(eventPath(e));
                        if (!e.inAreaX(th.element)) {
                            return;
                        }

                        const targetKey = th.column.key;
                        if (sourceKey !== targetKey) {
                            const { columnList } = model;
                            const tree = calk(columnList().index);

                            const oldPos = find(tree, node => node.key.model.key === sourceKey);
                            const newPos = find(tree, node => node.key.model.key === targetKey);
                            if (oldPos && newPos && newPos.path.indexOf(oldPos.node) < 0) {
                                const queue = oldPos.path.reverse();
                                const hostIndex = queue.findIndex(node => node.children.length > 1);
                                if (hostIndex >= 0) {
                                    const host = queue[hostIndex];
                                    const target = queue[hostIndex - 1] || oldPos.node;
                                    const index = host.children.indexOf(target);

                                    host.children.splice(index, 1);
                                    newPos.parent.children.splice(newPos.index, 0, target);

                                    target.level = newPos.parent.level + 1;
                                    preOrderDFS(
                                        target.children,
                                        (node, root, parent) => {
                                            node.level = (root || parent).level + 1;
                                        },
                                        target
                                    );

                                    columnList({
                                        index: tree
                                    }, {
                                        source: 'column.drop.command'
                                    });
                                }
                            }
                        }
                        break;
                    }
                    case 'end':
                    case 'drop': {
                        const { index } = model.columnList();
                        const oldPos = find(index, node => node.key.model.key === sourceKey);
                        if (oldPos) {
                            for (let leaf of findLeaves(oldPos.node)) {
                                const oldColumn = table.body.column(leaf.key.columnIndex);
                                oldColumn.removeClass(`${GRID_PREFIX}-drag`);
                            }
                        }
                        break;
                    }
                }
            }

        });
    }
}
