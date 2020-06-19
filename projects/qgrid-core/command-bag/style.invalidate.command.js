import { Command } from '../command/command';
import { Fastdom } from '../services/fastdom';
import { final } from '../infrastructure/final';
import { getFactory as valueFactory } from '../services/value';
import { noop } from '../utility/kit';
import { STYLE_INVALIDATE_COMMAND_KEY } from './command.bag';
import { StyleMonitor } from '../style/style.monitor';
import { StyleService } from '../style/style.service';
import * as columnService from '../column/column.service';

export class StyleInvalidateCommand extends Command {
    constructor(plugin) {
        const { table, model } = plugin;
        const lock = final();
        const styleService = new StyleService(model);

        const monitor = {
            row: new StyleMonitor(model),
            cell: new StyleMonitor(model)
        };

        function getRowActive() {
            const { row, rows } = model.style();
            return row !== noop || rows.length > 0;
        }

        function getCellActive() {
            const { cell, cells } = model.style();
            return cell !== noop || cells.length > 0;
        }

        function invalidate(domCell, domRow) {
            const isVirtual = model.scroll().mode === 'virtual';

            let isRowActive = getRowActive();
            let isCellActive = getCellActive();

            // TODO: improve performance
            const valueCache = new Map();
            const value = (row, column) => {
                let getValue = valueCache.get(column);
                if (!getValue) {
                    getValue = valueFactory(column);
                    valueCache.set(column, getValue);
                }

                return getValue(row);
            };

            const columnList = table.data.columns();
            const columnMap = columnService.map(columnList);

            let visitRow = styleService.row();
            let visitCell = styleService.cell();
            if (isVirtual) {
                isRowActive = true;
                isCellActive = true;

                visitRow = new VirtualRowStyle(table, visitRow).visitFactory();
                visitCell = new VirtualCellStyle(table, visitCell).visitFactory();
            }

            // For performance reason we make rowContext and cellContext the same reference 
            // for the all style calls.
            const rowContext = {
                class: noop,
                row: -1,
                value: null,
                columns: {
                    map: columnMap,
                    list: columnList
                }
            };

            const cellContext = {
                class: noop,
                row: -1,
                column: -1,
                value: null,
                columns: rowContext.columns
            };

            // To improve performance take rows and cells directly from the bag and not from the DOM table. 
            const { body } = table;
            const { rowToView, columnToView } = table.box.mapper;
            const bodyBag = table.box.bag.body;

            if (isRowActive) {
                const trs = bodyBag.getRowElements();
                for (let tr of trs) {
                    const { index, element, model } = tr;
                    // This private method we use only for performance, don't use it in other places.
                    const row = body.createRowCore(rowToView(index), element);

                    rowContext.class = domRow(row);
                    rowContext.row = index;
                    rowContext.value = value;

                    visitRow(model, rowContext);
                }
            }

            if (isCellActive) {
                const tds = bodyBag.getCellElements();
                for (let td of tds) {
                    const { rowIndex, columnIndex, element, row, column } = td;
                    // This private method we use only for performance, don't use it in other places.
                    const cell = body.createCellCore(rowToView(rowIndex), columnToView(columnIndex), element);

                    cellContext.class = domCell(cell);
                    cellContext.row = rowIndex;
                    cellContext.column = columnIndex;
                    cellContext.value = value;

                    visitCell(row, column, cellContext);
                }
            }
        }

        super({
            key: STYLE_INVALIDATE_COMMAND_KEY,
            canExecute: () => {
                if (model.scene().status !== 'stop') {
                    return false;
                }

                const isVirtual = model.scroll().mode === 'virtual';
                const isActive = isVirtual || getRowActive() || getCellActive();

                if (!isActive) {
                    return false;
                }

                const { invalidate } = model.style();
                const context = {
                    model
                };

                return invalidate.canExecute(context) === true
                    && invalidate.execute(context) !== true;
            },
            execute: () => {
                return lock(() => {
                    Fastdom.mutate(() => {
                        // Apply mutate inside another mutate 
                        // to ensure that invalidate is triggered last.
                        Fastdom.mutate(() => {
                            const domCell = monitor.cell.enter();
                            const domRow = monitor.row.enter();
                            try {
                                invalidate(domCell, domRow);
                            }
                            finally {
                                monitor.row.exit();
                                monitor.cell.exit();
                            }
                        });
                    });
                });
            }
        });
    }
}
