export function editCellShortcutFactory(plugin) {
    const { model, view } = plugin;
    return action => () => {
        const state = model.edit();
        const shortcuts = state[action + 'Shortcuts'];
        const { td } = view.editor;
        if (td) {
            if (td.column.editor && shortcuts.hasOwnProperty(td.column.editor)) {
                return shortcuts[td.column.editor];
            }

            if (shortcuts.hasOwnProperty(td.column.type)) {
                return shortcuts[td.column.type];
            }
        }

        return shortcuts['$default'];
    };
}