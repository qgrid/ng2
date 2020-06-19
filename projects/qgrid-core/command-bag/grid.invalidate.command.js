import { build } from '../pipe/pipe.build';
import { Command } from '../command/command';
import { Defer } from '../infrastructure/defer';
import { Fastdom } from '../services/fastdom';
import { isString, noop } from '../utility/kit';
import { Scheduler } from '../services/scheduler';
import { GRID_INVALIDATE_COMMAND_KEY, BUSY_COMMAND_KEY } from './command.bag';

export class GridInvalidateCommand extends Command {
    constructor(plugin) {
        const { model, commandPalette } = plugin;
        const scheduler = new Scheduler();

        super({
            key: GRID_INVALIDATE_COMMAND_KEY,
            execute: (settings) => {
                const { source, changes, pipe, why } = buildSettings(settings);
                const busy = commandPalette.get(BUSY_COMMAND_KEY);

                const runPipe = build(model);
                const cancelBusy = why === 'refresh' ? busy.execute() : noop;

                const nextTask = () => {
                    cancelBusy();

                    if (!scheduler.next()) {
                        model.scene({ status: 'pull' }, {
                            source,
                            behavior: 'core'
                        });
                    }
                };

                const defer = new Defer();
                const task = () => {
                    model.scene({ status: 'start' }, {
                        source,
                        behavior: 'core'
                    });

                    model.head().cache.clear();
                    model.body().cache.clear();
                    model.foot().cache.clear();

                    return Fastdom
                        .invoke(() => runPipe(source, changes, pipe || model.data().pipe))
                        .then(() => {
                            nextTask();
                            defer.resolve();
                        })
                        .catch(ex => {
                            Log.error('grid', ex);

                            nextTask();
                            defer.reject();
                        });
                };

                scheduler.add(task);
                return defer.promise;
            }
        });
    }
}

function buildSettings(...args) {
    if (args.length) {
        if (isString(args[0])) {
            return {
                source: args[0],
                changes: args[1] || {},
                pipe: args[2],
                why: 'refresh'
            };
        }

        return Object.assign({
            source: 'invalidate',
            changes: {},
            pipe: null,
            why: 'refresh'
        }, args[0])
    }

    return {
        source: 'invalidate',
        changes: {},
        pipe: null,
        why: 'refresh'
    };
}
