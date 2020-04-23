import { Directive, Input, OnDestroy, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Command } from '@qgrid/core/command/command';
import { CommandManager } from '@qgrid/core/command/command.manager';
import { Shortcut } from '@qgrid/core/shortcut/shortcut';
import { ShortcutDispatcher } from '@qgrid/core/shortcut/shortcut.dispatcher';


@Directive({
	selector: '[q-grid-command]'
})
export class CommandDirective implements OnInit, OnDestroy {
	private shortcut = new Shortcut(new ShortcutDispatcher());
	private shortcutOff: () => void;

	@Input('q-grid-command') command: Command;
	@Input('q-grid-command-context') commandContext: any;
	@Output('q-grid-command-execute') execute = new EventEmitter();

	constructor() {
	}

	ngOnInit() {
		const command = this.command;
		if (command && command.shortcut) {
			const manager = new CommandManager(f => {
				f();
				this.execute.emit();
			}, this.commandContext);

			this.shortcutOff = this.shortcut.register(manager, [command]);
		}
	}

	@HostListener('document:keydown', ['$event'])
	onKeyDown(e: KeyboardEvent) {
		if (this.shortcutOff) {
			this.shortcut.keyDown(e, 'command');
		}
	}

	ngOnDestroy() {
		if (this.shortcutOff) {
			this.shortcutOff();
			this.shortcutOff = null;
		}
	}
}
