export default class Shortcut {
	constructor(table, apply) {
		this.apply = apply;
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
			if (this.shortcuts.has(code)) {
				const cmds = this.shortcuts.get(code);
				cmds.forEach(cmd => {
					if (cmd.canExecute()) {
						e.preventDefault();
						this.apply(() => cmd.execute());
					}
				});
			}
		}
	}

	register(id, commands) {
		for (let value of commands.values()) {
			if (value.shortcut) {
				value.shortcut
					.toLowerCase()
					.split('|')
					.forEach(shortcut => {
						let temp = [];
						if (this.shortcuts.has(shortcut)) {
							temp = this.shortcuts.get(shortcut);
						}
						temp.push(value);
						this.shortcuts.set(shortcut, temp);
					});
			}
		}

		return () => {
			this.shortcuts.delete(id);
		};
	}

	onDestroy() {
		this.off();
	}
}
