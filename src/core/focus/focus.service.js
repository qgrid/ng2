import { isUndefined, clone } from '../utility/kit';
import { Disposable } from '../infrastructure/disposable';


export class FocusService {
    constructor(model) {
        this.model = model;
    }

    activate(rowIndex, columnIndex) {
        const { focus, scene, sceneChanged } = this.model;

        const focusState = clone(focus());
        if (!isUndefined(rowIndex)) {
            focusState.rowIndex = rowIndex;
        }

        if (!isUndefined(columnIndex)) {
            focusState.columnIndex = columnIndex;
        }

        const activate = () => {
            const { rowIndex, columnIndex } = focusState;
            focus({ rowIndex: -1, columnIndex: -1 }, { behavior: 'core', source: 'grid.service' });

            if (rowIndex >= 0 && columnIndex >= 0) {
                focus({ rowIndex, columnIndex });
            } else {
                const columnIndex = scene().column.line.findIndex(c => c.model.canFocus);
                focus({ rowIndex: 0, columnIndex });
            }
        };

        if (scene().status === 'stop') {
            activate();
        } else {
            sceneChanged.on((e, off) => {
                if (e.hasChanges('status')) {
                    if (e.state.status === 'stop') {
                        activate();
                        off();
                    }
                }
            });
        }
    }
}

export class FocusAfterRender extends Disposable {
    constructor(model, table) {
        super();

        this.using(model.sceneChanged.on((e, off) => {
            if (e.state.status === 'stop') {
                table.view.focus();
                off();
            }
        }));
    }
}