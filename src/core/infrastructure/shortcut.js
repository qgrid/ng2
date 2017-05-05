import {isFunction} from 'core/services/utility';

export default class Shortcut {
	constructor(table, apply) {
		this.apply = apply;
		this.commands = [];
		this.shortcuts = new Map();
		this.codeMap = new Map()
			.set(9, 'tab')
			.set(13, 'enter')
			.set(27, 'escape')
			.set(32, 'space')
			.set(33, 'pageUp')
			.set(34, 'pageDown')
			.set(35, 'end')
			.set(36, 'home')
			.set(37, 'left')
			.set(38, 'up')
			.set(39, 'right')
			.set(40, 'down')
			.set(113, 'f2');

		this.canExecute = table.isFocused.bind(table);
		this.off = table.keyDown(this.onKeyDown.bind(this));
	}

	translate(e) {
		const codes = [];
		if (e.ctrlKey) {
			codes.push('ctrl');
		}

		if (e.shiftKey) {
			codes.push('shift');
		}

		const char = (this.codeMap.get(e.keyCode) || String.fromCharCode(e.keyCode)).toLowerCase();
		codes.push(char);
		return codes.join('+');
	}

	onKeyDown(e) {
		if (this.canExecute()) {
			const code = this.translate(e);
			const cmds = this.find(code);
			if (cmds.length) {
				e.preventDefault();

				cmds.forEach(cmd =>
					this.apply(() => {
						if (cmd.canExecute()) {
							cmd.execute();
						}
					}));
			}
		}
	}

	register(id, commands) {
		for (let cmd of commands.values()) {
			if (cmd.shortcut) {
				if (isFunction(cmd.shortcut)) {
					this.commands.push(cmd);
				}
				else {
					cmd.shortcut
						.toLowerCase()
						.split('|')
						.forEach(shortcut => {
							let temp = [];
							if (this.shortcuts.has(shortcut)) {
								temp = this.shortcuts.get(shortcut);
							}
							temp.push(cmd);
							this.shortcuts.set(shortcut, temp);
						});
				}
			}
		}

		return () => {
			this.shortcuts.delete(id);
		};
	}

	find(code) {
		let result = [];
		if (this.shortcuts.has(code)) {
			result = result.concat(this.shortcuts.get(code));
		}

		result = result.concat(this.commands.filter(cmd => this.test(cmd.shortcut(), code)));
		return result;
	}

	test(shortcut, code) {
		return ('' + shortcut)
			.toLowerCase()
			.split('|')
			.some(shct => code === shct);
	}

	onDestroy() {
		this.off();
	}
}