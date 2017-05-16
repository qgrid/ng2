export class CommandManager {
  constructor() {
  }

  execute(commands) {
    // First we need to get list of executable commands, cause execution of prev command can
    // impact on canExecute of next command
    // TODO: refactor command pipeline
    const executableCommands = commands.filter(cmd => cmd.canExecute());
    executableCommands.forEach(cmd => cmd.execute());
  }
}
