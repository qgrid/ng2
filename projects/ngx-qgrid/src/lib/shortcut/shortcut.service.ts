import { Injectable } from '@angular/core';
import { Shortcut } from '@qgrid/core/shortcut/shortcut';
import { CommandManager } from '@qgrid/core/command/command.manager';

@Injectable()
export class ShortcutService {
	shortcut = new Shortcut(new CommandManager());

	keyDown(e: { code: string }) {
		this.shortcut.keyDown(e);
	}

	keyUp(e: { code: string }) {
		this.shortcut.keyUp(e);
	}

	reset() {
		this.shortcut.reset();
	}
}
