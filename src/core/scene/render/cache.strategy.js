
export class CacheStrategy {
    constructor(model, strategy) {
        let storage = new Map();

        const getValue = strategy.getValue.bind(strategy);

        const defaultGetValue =
            (row, column, select, rowIndex, columnIndex) =>
                getValue(row, column, select, rowIndex, columnIndex);

        const readonlyGetValue =
            (row, column, select, rowIndex, columnIndex) => {
                const key = `getValue-${rowIndex}x${column.key}`;
                if (storage.has(key)) {
                    return storage.get(key);
                }

                const value = getValue(row, column, select, rowIndex, columnIndex);
                storage.set(key, value);
                return value;
            };

        this.getValue = defaultGetValue;

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
    
        this.setValue = (row, column, value, rowIndex, columnIndex) => {
            return strategy.setValue(row, column, value, rowIndex, columnIndex);
        }
    
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
            if (e.hasChanges('status')) {
                storage = new Map();
            }
        });

        model.dataChanged.watch(e => {
            if (e.hasChanges('isReadonly')) {
                storage = new Map();

                this.getValue = e.state.isReadonly
                    ? readonlyGetValue
                    : defaultGetValue;
            }
        });
    }
}