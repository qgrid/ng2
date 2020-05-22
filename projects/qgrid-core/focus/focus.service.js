import { isUndefined } from '../utility/kit';
import { takeOnce, filter } from '../rx/rx.operators';

export class FocusService {
    constructor(model) {
        this.model = model;
    }

    activate(rowIndex, columnIndex) {
        const { focus, scene, sceneChanged } = this.model;

        if (isUndefined(rowIndex)) {
            rowIndex = focus().rowIndex;
        }

        if (rowIndex < 0) {
            rowIndex = 0;
        }

        if (isUndefined(columnIndex)) {
            columnIndex = focus().columnIndex;
        }

        if (columnIndex < 0) {
            columnIndex = scene().column.line.findIndex(c => c.model.canFocus);
        }

        if (scene().status === 'stop') {
            this.focus(rowIndex, columnIndex);
        } else {
            sceneChanged.on((e, off) => {
                if (e.hasChanges('status')) {
                    if (e.state.status === 'stop') {
                        off();

                        this.focus(rowIndex, columnIndex);
                    }
                }
            });
        }
    }

    focus(rowIndex, columnIndex) {
        const { pagination, focus } = this.model;
        const { count, current, size } = pagination();

        const last = this.getPage(count);
        const target = Math.max(0, Math.min(this.getPage(rowIndex), last));

        if (current !== target) {
            pagination({
                current: target
            }, {
                source: 'focus.service'
            });

            this.activate(rowIndex, columnIndex);
            return;
        }

        rowIndex = rowIndex - size * current;

        focus({
            isActive: true,
            rowIndex,
            columnIndex
        }, {
            source: 'focus.service'
        });
    }

    getPage(index) {
        const { model } = this;
        const { size } = model.pagination();

        return Math.max(0, Math.floor(index / size));
    }
}

export class FocusAfterRenderService {
    constructor(plugin) {
        const { table, model, observe } = plugin;

        observe(model.sceneChanged)
            .pipe(
                filter(e => e.hasChanges('status') && e.state.status === 'stop'),
                takeOnce()
            )
            .subscribe(e => {
                table.view.focus();
            });
    }
}