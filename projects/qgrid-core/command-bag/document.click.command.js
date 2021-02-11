import { Command } from '../command/command';
import { eventPath } from '../services/dom';
import { DOCUMENT_CLICK_COMMAND_KEY, EDIT_CELL_CANCEL_COMMAND_KEY } from './command.bag';

export class DocumentClickCommand extends Command {
    constructor(plugin) {
        const { model, commandPalette } = plugin;

        const isPartOfGrid = (element, host) => element === host || (element.classList && element.classList.contains('q-grid-editor-part'));

        super({
            key: DOCUMENT_CLICK_COMMAND_KEY,
            execute: ([host, e]) => {
                if (model.edit().status === 'edit') {
                    const path = eventPath(e);
                    const clickedOutside = !path.some(x => isPartOfGrid(x, host));
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
