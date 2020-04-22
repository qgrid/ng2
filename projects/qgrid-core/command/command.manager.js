export class CommandManager {
	constructor(apply = f => f(), context) {
		this.apply = apply;
		this.context = context;
	}

	invoke(commands) {
		if (commands.length) {

			this.apply(() => {
				const context = this.context;
				const priorityCommands = Array.from(commands);
				priorityCommands.sort((x, y) => y.priority - x.priority);

				for (const cmd of priorityCommands) {
					if (context) {
						if (cmd.execute(context) === false) {
							break;
						}
					} else {
						if (cmd.execute() === false) {
							break;
						}
					}

				}
			});

			return true;
		}

		return false;
	}

	filter(commands) {
		return commands.filter(cmd => cmd.sink = cmd.canExecute());
	}
}
