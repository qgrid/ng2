import { GridError } from '../infrastructure/error';

export class CommandPalette {
    constructor(model, shortcut) {
        this.model = model;
        this.shortcut = shortcut;
    }

    register(command) {
        this.model.command({
            items: this
                .model
                .command()
                .items
                .concat([command])
        }, {
            source: 'command.palette'
        });

        return this.shortcut.register(command);
    }

    unregister(command) {
        this.model.command({
            items: this.model
                .command()
                .items
                .filter(cmd => cmd !== command)
        }, {
            source: 'command.palette'
        });

        this.shortcut.unregister(command);
    }

    get(key) {
        const cmd = this.find(key);
        if (!cmd) {
            throw new GridError(
                'command.palette',
                `Command ${key.name} is not found`
            );
        }

        return cmd;
    }

    find(key) {
        const { items } = this.model.command();
        return items.find(x => x.key === key) || null;
    }
}
