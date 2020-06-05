import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { GRID_PREFIX } from '../definition';
import { eventPath } from '../services/dom';
import { PathService } from '../path/path.service';

export const ROW_DROP_COMMAND_KEY = commandKey('row.drop.command');

export class RowDropCommand extends Command {
    constructor(plugin) {
        const { model } = plugin;
        const pathFinder = new PathService(table.box.bag.body);

        super({
            key: ROW_DROP_COMMAND_KEY,
            canExecute: e => {
                if (e.action === 'end') {
                    return true;
                }

                const row = pathFinder.row(eventPath(e));
                return !!row;
            },
            execute: e => {
                const oldIndex = e.dragData;
                switch (e.action) {
                    case 'over': {
                        const row = pathFinder.row(eventPath(e));
                        if (!e.inAreaY(row.element)) {
                            return;
                        }

                        const newIndex = row.index;
                        if (oldIndex !== newIndex) {
                            const oldRow = table.body.row(oldIndex);
                            oldRow.removeClass(`${GRID_PREFIX}-drag`);

                            const newRow = table.body.row(newIndex);
                            newRow.addClass(`${GRID_PREFIX}-drag`);

                            const tr = table.body.row(oldIndex).model();
                            const entries = [];
                            for (let entry of model.rowList().index.entries()) {
                                const index = entry[1];
                                if (oldIndex < index && index <= newIndex) {
                                    entry[1] = index - 1;
                                } else if (oldIndex > index && index >= newIndex) {
                                    entry[1] = index + 1;
                                }

                                entries.push(entry);
                            }

                            const index = new Map(entries);
                            const { rowId } = model.data();
                            const key = rowId(newIndex, tr.model);
                            index.set(key, newIndex);
                            model.rowList({
                                index
                            }, {
                                source: 'row.drop.command'
                            });

                            e.dragData = newIndex;
                        }
                        break;
                    }
                    case 'drop':
                    case 'end': {
                        const oldRow = table.body.row(oldIndex);
                        oldRow.removeClass(`${GRID_PREFIX}-drag`);
                        break;
                    }
                }
            }
        });
    }
}
