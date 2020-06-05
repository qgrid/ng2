export function navigationContextFactory(model) {
    return (type, settings) => {
        const oldRow = this.currentRow;
        const oldColumn = this.currentColumn;
        const keyCode = model.action().shortcut.keyCode;

        return Object.assign({
            model,
            type,
            oldRow,
            oldColumn,
            keyCode
        }, settings);
    }
}