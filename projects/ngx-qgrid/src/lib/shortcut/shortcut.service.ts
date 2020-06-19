import { Injectable, SkipSelf, Optional } from '@angular/core';
import { Shortcut } from '@qgrid/core/shortcut/shortcut';
import { CommandManager } from '@qgrid/core/command/command.manager';
import { GridRoot } from '../grid/grid-root';

@Injectable()
export class ShortcutService {
	private _shortcut: Shortcut;

	get shortcut() {
		const isRoot = this.gridRoot && !this.parent;
		if (isRoot) {
			const { model } = this.gridRoot;
			return model.shortcut().root;
		} else {
			return this._shortcut || (this._shortcut = new Shortcut(new CommandManager()));
		}
	}

	constructor(
		@SkipSelf() @Optional() private parent: ShortcutService,
		@Optional() private gridRoot: GridRoot,
	) {
	}

	keyDown(code: string) {
		return this.shortcut.keyDown(code);
	}

	keyUp(code: string) {
		this.shortcut.keyUp(code);
	}

	reset() {
		this.shortcut.reset();
	}
}
