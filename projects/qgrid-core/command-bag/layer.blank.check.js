import { Command } from '../command/command';
import { LAYER_BLANK_CHECK_COMMAND_KEY } from './command.bag';

export class LayerBlankCheckCommand extends Command {
    constructor(plugin) {
        const { model, table } = plugin;

        super({
            key: LAYER_BLANK_CHECK_COMMAND_KEY,
            execute: () => {
                const { rows } = model.data();

                if (rows.length) {
                    if (table.view.hasLayer('blank')) {
                        table.view.removeLayer('blank');
                    }
                } else {
                    if (!table.view.hasLayer('blank')) {
                        table.view.addLayer('blank');
                    }
                }
            }
        });
    }
}
