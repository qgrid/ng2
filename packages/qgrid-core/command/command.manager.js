export class CommandManager {
	constructor(apply = f => f(), context) {
		this.apply = apply;
		this.context = context;
	}

	invoke(commands, context) {
		context = context || this.context;
		if (commands.length) {

			const priorityCommands = Array.from(commands);
			priorityCommands.sort((x, y) => y.priority - x.priority);

			this.apply(() => {
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
