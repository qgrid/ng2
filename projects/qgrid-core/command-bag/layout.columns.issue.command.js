import { Command } from '../command/command';
import { LAYOUT_COLUMNS_ISSUE_COMMAND_KEY } from './command.bag';
import { selectColumn } from '../navigation/navigation.state.selector';

export class LayoutColumnsIssueCommand extends Command {
    constructor(plugin) {
        const { model, table } = plugin;

        super({
            key: LAYOUT_COLUMNS_ISSUE_COMMAND_KEY,
            execute: () => {
                const { head } = table;
                const { cells } = head.context.bag;
                const layout = model.layout().columns;

                const form = new Map();
                for (let cell of cells) {
                    const { column, rowIndex, columnIndex } = cell;
                    if (!column.canResize) {
                        continue;
                    }

                    const { key } = column;
                    if (layout.has(key)) {
                        const { width } = layout.get(key);
                        form.set(key, { width });
                    } else {
                        const th = head.cell(rowIndex, columnIndex);
                        const width = th.width();

                        // It can be that clientWidth is zero on start, while css is not applied.
                        if (width) {
                            form.set(key, { width });
                        }
                    }
                }

                model.layout({
                    columns: form
                }, {
                    source: 'layout.columns.issue.command',
                    behavior: 'core'
                });

                const column = selectColumn(model.navigation());
                if (column && column.viewWidth) {
                    const viewForm = new Map(form)
                    const columnForm = form.get(column.key);
                    viewForm.set(column.key, { width: columnForm ? Math.max(columnForm.width, column.viewWidth) : column.viewWidth });
                    return viewForm;
                }

                return form;
            }
        });
    }
}
