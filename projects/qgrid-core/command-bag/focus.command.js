import { Command } from '../command/command';
import { isUndefined } from '../utility/kit';
import { selectRowIndex, selectColumnIndex } from '../navigation/navigation.state.selector';
import { Fastdom } from '../services/fastdom';
import { GRID_PREFIX } from '../definition';
import { 
    FOCUS_COMMAND_KEY,
    FOCUS_AFTER_RENDER_COMMAND_KEY,
    NAVIGATION_GO_TO_COMMAND_KEY
} from './command.bag';

export class FocusCommand extends Command {
    constructor(plugin) {
        const { table, model, commandPalette } = plugin;

        function fixPos(pos) {
            let rowIndex = pos ? pos.rowIndex : undefined;
            let columnIndex = pos ? pos.columnIndex : undefined;

            if (isUndefined(rowIndex)) {
                rowIndex = selectRowIndex(model.navigation());
            }

            if (rowIndex < 0) {
                rowIndex = model.pagination().size * model.pagination().current;
            }

            if (isUndefined(columnIndex)) {
                columnIndex = selectColumnIndex(model.navigation());
            }

            if (columnIndex < 0) {
                columnIndex = model
                    .scene()
                    .column
                    .line
                    .findIndex(c => c.model.canFocus);
            }

            return {
                rowIndex,
                columnIndex
            };
        }

        function toNavPos(pos) {
            const { current, size } = model.pagination();

            return {
                rowIndex: pos.rowIndex - size * current,
                columnIndex: pos.columnIndex,
            };
        }

        function focusGrid(pos) {
            if (!table.view.isFocused()) {
                table.view.focus();
            }

            if (!model.focus().isActive) {
                Fastdom.mutate(() => table.view.addClass(`${GRID_PREFIX}-active`));

                model.focus({
                    isActive: true,
                    rowIndex: pos.rowIndex,
                    columnIndex: pos.columnIndex,
                }, {
                    source: 'focus.command'
                });
            } else {
                model.focus({
                    rowIndex: pos.rowIndex,
                    columnIndex: pos.columnIndex,
                }, {
                    source: 'focus.command'
                });
            }
        }

        function getPage(rowIndex) {
            const { size } = model.pagination();
            return Math.max(0, Math.floor(rowIndex / size));
        }

        function changePage(pos) {
            const focusAfterRender = commandPalette.get(FOCUS_AFTER_RENDER_COMMAND_KEY);
            const { count, current } = model.pagination();

            const last = getPage(count);
            const target = Math.max(0, Math.min(getPage(pos.rowIndex), last));

            if (current !== target) {
                focusAfterRender.execute(pos);

                pagination({
                    current: target
                }, {
                    source: 'focus.command'
                });

                return true;
            }

            return false;
        }

        function delayedFocus(pos) {
            const focusAfterRender = commandPalette.get(FOCUS_AFTER_RENDER_COMMAND_KEY);
            if (model.scene().status !== 'stop') {
                focusAfterRender.execute(pos);
                return true;
            }

            return false;
        }

        super({
            key: FOCUS_COMMAND_KEY,
            execute: pos => {
                pos = fixPos(pos);

                if (delayedFocus(pos) || changePage(pos)) {
                    return;
                }

                focusGrid(pos);

                const goTo = commandPalette.get(NAVIGATION_GO_TO_COMMAND_KEY);
                const navPos = toNavPos(pos);
                if (goTo.canExecute(navPos) === true) {
                    goTo.execute(navPos);
                }
            }
        });
    }
}
