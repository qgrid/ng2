import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { clone, isUndefined } from '../utility/kit';

export const FILTER_ROW_COMMIT_COMMAND_KEY = commandKey('filter.row.commit.command');

export class FilterRowCommitCommand extends Command {
    constructor(plugin) {
        const { model } = plugin;

        super({
            key: FILTER_ROW_COMMIT_COMMAND_KEY,
            canExecute: ([column, search]) => {
                return !!column;
            },
            execute: ([column, search]) => {
                const { key } = column;

                let { by, operatorFactory } = model.filter();
                by = clone(by);

                const filter = by[key] || (by[key] = {});
                if (!isUndefined(search) && search !== null && search !== '') {
                    const opList = operatorFactory(column);
                    const op = filter.expression ? filter.expression.op : opList[0];
                    if (op === 'contains') {
                        filter.items = [search];
                    } else {
                        filter.expression = {
                            kind: 'condition',
                            left: key,
                            op,
                            right: search
                        };
                    }
                }
                else {
                    delete by[key];
                }

                model.filter({
                    by
                }, {
                    source: 'filter.let'
                });

                return true;
            }
        });
    }
}
