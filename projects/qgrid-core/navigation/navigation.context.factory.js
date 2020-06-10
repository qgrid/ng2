export function navigationContextFactory(nav) {
    return (type, settings) => {
        const oldRow = nav.currentRow;
        const oldColumn = nav.currentColumn;
  
        return Object.assign({
            type,
            oldRow,
            oldColumn,
        }, settings);
    }
}