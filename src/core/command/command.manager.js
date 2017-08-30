export class CommandManager {
	constructor(apply = f => f()) {
		this.apply = apply;
	}

	invoke(commands) {
		// First we need to get list of executable commands, cause execution of prev command can
		// impact on canExecute of next command
		this.apply(() => commands.forEach(cmd => cmd.execute()));
		return commands.length > 0;
	}

	filter(commands) {
		return commands.filter(cmd => cmd.canExecute());
	}
}
