export class CommandManager {
	constructor(apply = f => f()) {
		this.apply = apply;
	}

	keyDown() { }

	canExecute() {
		return true;
	}

	execute(commands) {
		// First we need to get list of executable commands, cause execution of prev command can
		// impact on canExecute of next command
		const executableCommands = commands.filter(cmd => cmd.canExecute());
		this.apply(() => executableCommands.forEach(cmd => cmd.execute()));
		return executableCommands.length > 0;
	}
}