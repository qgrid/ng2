import { Command } from '../command/command';
import { eventPath } from '../services/dom';
import { DOCUMENT_CLICK_COMMAND_KEY, EDIT_CELL_CANCEL_COMMAND_KEY } from './command.bag';

export class DocumentClickCommand extends Command {
    constructor(plugin) {
        const { model, commandPalette } = plugin;

        super({
            key: DOCUMENT_CLICK_COMMAND_KEY,
            execute: ([host, e]) => {
                const path = eventPath(e);
                const clickedOutside = path.every(el => el !== host);
                if (clickedOutside) {
                    switch(model.edit().status) {
                        case 'cell': {
                            const cancelEdit = commandPalette.get(EDIT_CELL_CANCEL_COMMAND_KEY);
                            if(cancelEdit.canExecute() === true) {
                                cancelEdit.execute();
                            }
                        }
                    }
                }
            }
        });
    }
}
