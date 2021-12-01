import { flatten, isFunction, yes } from '../utility/kit';

const WILDCARD_SYMBOL = '*';
const notWildcard = cmd => cmd.shortcut !== WILDCARD_SYMBOL;


export class ShortcutDispatcher {
	constructor() {
		this.managerMap = new Map();
	}

	register(manager, commands) {
		commands = commands.values ? commands.values() : commands;
		let context = this.managerMap.get(manager);
		if (!context) {
			context = {
				commands: [],
				shortcuts: new Map()
			};

			this.managerMap.set(manager, context);
		}

		const disposes = [];
		for (let cmd of commands) {
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
						.forEach(shct => {
							let shortcuts = [];
							if (context.shortcuts.has(shct)) {
								shortcuts = context.shortcuts.get(shct);
							}

							shortcuts.push(cmd);
							context.shortcuts.set(shct, shortcuts);
							disposes.push(() => {
								const shortcutCommands = context.shortcuts.get(shct);
								if (shortcutCommands) {
									const index = shortcutCommands.indexOf(cmd);
									if (index >= 0) {
										shortcutCommands.splice(index, 1);
										if (!shortcutCommands.length) {
											context.shortcuts.delete(shct);
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
			const result = manager.invoke(commands, null, source) || result;
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
		const search = this.searchFactory(code);

		const candidates = Array
			.from(this.managerMap.entries())
			.map(([manager, context]) => ({
				manager,
				commands: manager.filter(search(context), source)
			}));

		// Skip wildcard commands if there are some explicit shortcuts
		const allCommands = flatten(candidates.map(x => x.commands));
		const hasNotWildcardCommand = allCommands.filter(notWildcard).length > 0;
		const test = hasNotWildcardCommand ? notWildcard : yes;
		return candidates
			.map(({ commands, manager }) => ({
				manager,
				commands: commands.filter(test),
			}))
			.filter(({ commands }) => commands.length > 0);
	}

	searchFactory(code) {
		return context => {
			let result = [];
			if (context.shortcuts.has(code)) {
				result = result.concat(context.shortcuts.get(code));
			}

			if (context.shortcuts.has(WILDCARD_SYMBOL) && code !== WILDCARD_SYMBOL) {
				result = result.concat(context.shortcuts.get(WILDCARD_SYMBOL));
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
			.some(shct => shct === WILDCARD_SYMBOL || code === shct);
	}
}
