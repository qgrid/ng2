import { flatten, isFunction, yes } from '../utility/kit';

export class ShortcutDispatcher {
	constructor() {
		this.managerMap = new Map();
	}

	register(manager, commands) {
		const cmds = commands.values ? commands.values() : commands;
		let context = this.managerMap.get(manager);
		if (!context) {
			context = {
				commands: [],
				shortcuts: new Map()
			};

			this.managerMap.set(manager, context);
		}

		const disposes = [];
		for (let cmd of cmds) {
			if (cmd.shortcut) {
				if (isFunction(cmd.shortcut)) {
					context.commands.push(cmd);
					disposes.push(() => {
						const index = context.commands.indexOf(cmd);
						if (index >= 0) {
							context.commands.splice(index, 1);
						}
					});
				}
				else {
					cmd.shortcut
						.toLowerCase()
						.split('|')
						.forEach(shortcut => {
							let temp = [];
							if (context.shortcuts.has(shortcut)) {
								temp = context.shortcuts.get(shortcut);
							}
							temp.push(cmd);
							context.shortcuts.set(shortcut, temp);
							disposes.push(() => {
								const shortcutCommands = context.shortcuts.get(shortcut);
								if (shortcutCommands) {
									const index = shortcutCommands.indexOf(cmd);
									if (index >= 0) {
										shortcutCommands.splice(index, 1);
										if (!shortcutCommands.length) {
											context.shortcuts.delete(shortcut);
										}
									}
								}
							});
						});
				}
			}
		}

		return () => {
			disposes.forEach(dispose => dispose());
			if (context.commands.length === 0 && Object.keys(context.shortcuts).length === 0) {
				this.managerMap.delete(manager);
			}
		};
	}

	execute(code, source) {
		const activities = this.fetchActivities(code, source);

		return activities.reduce((memo, activity) => {
			const commands = activity.commands;
			const manager = activity.manager;
			const result = manager.invoke(commands, source) || result;
			if (result) {
				memo.push(...commands.map(cmd => cmd.source));
			}
			return memo;
		}, []);
	}

	canExecute(code, source) {
		const activities = this.fetchActivities(code, source);
		return activities.length > 0;
	}

	fetchActivities(code, source) {
		const notWildcard = cmd => cmd.shortcut !== '*';
		const search = this.searchFactory(code);
		const entries = Array
			.from(this.managerMap.entries())
			.map(entry => {
				const manager = entry[0];
				const commands = entry[1];
				return {
					commands: manager.filter(search(commands), source),
					manager: entry[0]
				};
			})
			.filter(entry => entry.commands.length > 0);

		const allCommands = flatten(entries.map(x => x.commands));

		// Skip wildcard commands if there are some explicit shortcuts
		const isActive = allCommands.filter(notWildcard).length > 0 ? notWildcard : yes;
		return entries
			.map(entry => {
				const commands = entry.commands;
				const manager = entry.manager;
				const activeCommands = commands.filter(isActive);
				return {
					commands: activeCommands,
					manager: manager
				};
			})
			.filter(entry => entry.commands.length > 0);
	}

	searchFactory(code) {
		return context => {
			let result = [];
			if (context.shortcuts.has(code)) {
				result = result.concat(context.shortcuts.get(code));
			}

			result = result.concat(context.commands
				.map(cmd => cmd.clone({ shortcut: cmd.shortcut() }))
				.filter(cmd => this.test(cmd.shortcut, code)));

			return result;
		};
	}

	test(shortcut, code) {
		code = code.toLowerCase();
		return ('' + shortcut)
			.toLowerCase()
			.split('|')
			.some(shct => shct === '*' || code === shct);
	}
}
