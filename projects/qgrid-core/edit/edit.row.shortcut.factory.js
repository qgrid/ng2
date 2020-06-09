export function editRowShortcutFactory(plugin) {
    const { model } = plugin;
    return action => {
        const shortcuts = model.edit()[action + 'Shortcuts'];
        return shortcuts && (shortcuts['row'] || shortcuts['$default']) ;
    };
}