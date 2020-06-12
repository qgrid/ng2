export class CommandManager {
	invoke(commands) {
		const priorityCommands = Array.from(commands);
		priorityCommands.sort((x, y) => y.priority - x.priority);

		for (const cmd of priorityCommands) {
			let stopPropagate = cmd.execute() === true;
			cmd.canExecuteCheck.next();

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
