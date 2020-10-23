import { Command } from '../command/command';
import { clone, isUndefined } from '../utility/kit';
import { FILTER_ROW_COMMIT_COMMAND_KEY } from './command.bag';

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
                    switch (op) {
                        case 'contains': {
                            filter.items = [search];
                            break;
                        }
                        case 'between': {
                            filter.expression = {
                                kind: 'condition',
                                left: key,
                                op,
                                right: [null, search]
                            };
                            break;
                        }
                        default: {
                            filter.expression = {
                                kind: 'condition',
                                left: key,
                                op,
                                right: search
                            };
                            break;
                        }
                    }
                }
                else {
                    delete by[key];
                }

                model.filter({ by }, { source: 'filter.let' });

                return true;
            }
        });
    }
}