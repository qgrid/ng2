export class CommandKey {
  constructor(name) {
    this.name = name;
  }
}

export function commandKey(name) {
  return CommandKey(name);
}

export function generateCommandKey() {
  return CommandKey("some name");
}