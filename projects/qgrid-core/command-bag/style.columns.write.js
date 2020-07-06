import { Command } from '../command/command';
import { STYLE_COLUMNS_WRITE_COMMAND_KEY } from './command.bag';
import * as columnService from '../column/column.service';
import * as css from '../services/css';

export class StyleColumnsWriteCommand extends Command {
    constructor(plugin) {
        const { model, table, disposable } = plugin;

        disposable.add(() => {
            const { id } = model.grid();
            const sheet = css.sheet(id, 'column-layout');
            sheet.remove();
        });

        super({
            key: STYLE_COLUMNS_WRITE_COMMAND_KEY,
            execute: form => {
                const columns = table.data.columns();
                const getWidth = columnService.widthFactory(table, form);

                const style = {};
                let { length } = columns;

                while (length--) {
                    const column = columns[length];
                    const width = getWidth(column.key);
                    if (null !== width) {
                        const key = css.escape(column.key);
                        const size = width + 'px';
                        const sizeStyle = {
                            'width': size,
                            'min-width': size,
                            'max-width': size
                        };

                        style[`.q-grid-the-${key}`] = sizeStyle;
                    }
                }

                const { id } = model.grid();
                const sheet = css.sheet(id, 'column-layout');
                sheet.set(style);
            }
        });
    }
}
