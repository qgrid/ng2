import { getFactory as valueFactory } from '../../services/value';
import { getFactory as labelFactory } from '../../services/label';

export class CacheStrategy {
    constructor(model, strategy) {
        let storage = new Map();

        const defaultGetValue =
            (row, column, select, rowIndex, columnIndex) => {
                const key = `valueFactory-${column.key}`;
                select = storage.get(key);
                if (!select) {
                    select = valueFactory(column);
                    storage.set(key, select);
                }

                return strategy.getValue(row, column, select, rowIndex, columnIndex);
            };

        const readonlyGetValue =
            (row, column, select, rowIndex, columnIndex) => {
                const key = `getValue-${rowIndex}x${column.key}`;
                if (storage.has(key)) {
                    return storage.get(key);
                }

                const value = defaultGetValue(row, column, select, rowIndex, columnIndex);
                storage.set(key, value);
                return value;
            };

        const defaultGetLabel =
            (row, column, select, rowIndex, columnIndex) => {
                const key = `labelFactory-${column.key}`;
                select = storage.get(key);
                if (!select) {
                    select = labelFactory(column);
                    storage.set(key, select);
                }

                return strategy.getLabel(row, column, select, rowIndex, columnIndex);
            };

        const readonlyGetLabel =
            (row, column, select, rowIndex, columnIndex) => {
                const key = `getLabel-${rowIndex}x${column.key}`;
                if (storage.has(key)) {
                    return storage.get(key);
                }

                const value = defaultGetLabel(row, column, select, rowIndex, columnIndex);
                storage.set(key, value);
                return value;
            };


        this.getValue = defaultGetValue;
        this.getLabel = defaultGetLabel;

        this.colspan = (row, column, rowIndex, columnIndex) => {
            const key = `colspan-${rowIndex}x${column.model.key}`;
            if (storage.has(key)) {
                return storage.get(key);
            }

            const value = strategy.colspan(row, column, rowIndex, columnIndex);
            storage.set(key, value);
            return value;
        };

        this.rowspan = (row, column, rowIndex, columnIndex) => {
            const key = `rowspan-${rowIndex}x${column.model.key}`;
            if (storage.has(key)) {
                return storage.get(key);
            }

            const value = strategy.rowspan(row, column, rowIndex, columnIndex);
            storage.set(key, value);
            return value;
        };

        this.columns = (row, pin, rowIndex) => {
            const key = `columns-${pin}-${rowIndex}`;
            if (storage.has(key)) {
                return storage.get(key);
            }

            const value = strategy.columns(row, pin, rowIndex);
            storage.set(key, value);
            return value;
        }

        this.setValue = (...args) => strategy.setValue(...args);
        this.setLabel = (...args) => strategy.setLabel(...args);

        this.columnList = (pin = null) => {
            const key = `columnList-${pin}`;
            if (storage.has(key)) {
                return storage.get(key);
            }

            const value = strategy.columnList(pin);
            storage.set(key, value);
            return value;
        }

        model.sceneChanged.watch(e => {
            if (e.hasChanges('round') && e.state.round > 0) {
                storage = new Map();
            }
        });

        model.gridChanged.watch(e => {
            if (e.hasChanges('isReadonly')) {
                storage = new Map();

                if (e.state.isReadonly) {
                    this.getValue = readonlyGetValue;
                    this.getLabel = readonlyGetLabel;
                } else {
                    this.getValue = getValue;
                    this.getLabel = this.getLabel;
                }
            }
        });
    }
}