import { View } from '../view';
import * as css from '../services/css';
import * as columnService from '../column/column.service';
import { clone } from '../utility';
import { Log, Composite } from '../infrastructure';

export class LayoutView extends View {
    constructor(model, table, service) {
        super(model);
        this.model = model;
        this.table = table;
        this.service = service;

        this.onInit();
    }

    onInit() {
        const model = this.model;

        model.sceneChanged.watch(e => {
            if (e.hasChanges('column')) {
                this.invalidateColumns();
            }
        });

        model.layoutChanged.watch(e => {
            if (e.hasChanges('columns')) {
                const form = this.getColumnForm();
                this.invalidateColumns(form);
            }

            // if (e.hasChanges('rows')) {
            //     const form = this.getRowForm();
            //     this.invalidateRows(form);
            // }
        });

        model
            .style({
                row: Composite.func([model.style().row, this.styleRow.bind(this)])
            });
    }

    getRowForm() {
        const model = this.model;
        const layout = model.layout;
        return clone(layout().rows);
    }

    getColumnForm() {
        const model = this.model;
        const layout = model.layout;
        const state = clone(layout().columns);
        const headRow = this.table.head.row(0);
        if (headRow) {
            const columns = this.table.data.columns();
            let length = columns.length;
            while (length--) {
                const column = columns[length];
                if (!state.has(column.key)) {
                    if (column.canResize) {
                        const index = columns.findIndex(c => c === column);
                        state.set(column.key, { width: headRow.cell(index).width() });
                    }
                }
            }
        }

        return state;
    }

    invalidateColumns(form) {
        Log.info('layout', 'invalidate columns');

        const table = this.table;
        const getWidth = columnService.widthFactory(table, form);
        const columns = table.data.columns();
        const style = {};

        let length = columns.length;
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

                style[`td.q-grid-${key}`] = sizeStyle;
                style[`th.q-grid-${key}`] = sizeStyle;
            }
        }

        const sheet = css.sheet(this.gridId, 'layout-column');
        sheet.set(style);
    }

    styleRow(row, context) {
        const form = this.getRowForm();
        const style = form.get(row);
        if (style) {
            context.class('resized', { height: style.height + 'px' });
        }
    }

    dispose() {
        super.dispose();

        const columnSheet = css.sheet(this.gridId, 'layout-column');
        columnSheet.remove();
    }

    get gridId() {
        return this.model.grid().id;
    }
}