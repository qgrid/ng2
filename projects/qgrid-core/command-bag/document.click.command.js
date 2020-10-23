import { Command } from '../command/command';
import { eventPath } from '../services/dom';
import { DOCUMENT_CLICK_COMMAND_KEY, EDIT_CELL_CANCEL_COMMAND_KEY } from './command.bag';

export class DocumentClickCommand extends Command {
    constructor(plugin) {
        const { model, commandPalette } = plugin;

        super({
            key: DOCUMENT_CLICK_COMMAND_KEY,
            execute: ([host, e]) => {
                if (model.edit().status === 'edit') {
                    const path = eventPath(e);
                    const clickedOutside = path.every(x => x !== host && !x.classList.contains('q-grid-editor-part'));
                    if (clickedOutside) {

                        const cancelEdit = commandPalette.get(EDIT_CELL_CANCEL_COMMAND_KEY);
                        if (cancelEdit.canExecute() === true) {
                            cancelEdit.execute();
                        }
                    }
                }
            }
        });
    }
}
