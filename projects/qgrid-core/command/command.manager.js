export class CommandManager {
	invoke(commands) {
		const priorityCommands = Array.from(commands);
		priorityCommands.sort((x, y) => y.priority - x.priority);

		for (const cmd of priorityCommands) {
			let stopPropagate = cmd.execute() === true;
			if (stopPropagate) {
				return true;
			}
		}

		return false;
	}

	filter(commands) {
		return commands.filter(cmd => cmd.canExecute() === true);
	}
}
