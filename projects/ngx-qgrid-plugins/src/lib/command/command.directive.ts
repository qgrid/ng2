import {
	Directive,
	DoCheck,
	OnChanges,
	Input,
	ElementRef,
	SimpleChanges,
	OnInit,
	EventEmitter,
	Output
} from '@angular/core';
import { Disposable } from '@qgrid/ngx';
import { Command } from '@qgrid/core/command/command';
import { CommandManager } from '@qgrid/core/command/command.manager';
import { Shortcut } from '@qgrid/core/shortcut/shortcut';
import { ShortcutDispatcher } from '@qgrid/core/shortcut/shortcut.dispatcher';

@Directive({
	selector: '[q-grid-command]',
	providers: [Disposable]
})
export class CommandDirective implements DoCheck, OnChanges, OnInit {
	@Input('q-grid-command')
	command: Command<any>;

	@Input('q-grid-command-arg')
	commandArg: any;

	@Input('q-grid-command-use-shortcut')
	useCommandShortcut: boolean;

	@Input('q-grid-command-event')
	commandEvent = 'click';

	@Output('q-grid-command-execute')
	commandExecute = new EventEmitter<any>();

	constructor(
		private disposable: Disposable,
		private host: ElementRef
	) {
	}

	ngOnInit() {
		const { nativeElement } = this.host;

		nativeElement
			.addEventListener(this.commandEvent, e => this.execute(e));
	}

	ngDoCheck() {
		if (this.command) {
			this.updateState();
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.command) {
			this.unregister();

			if (this.command) {
				this.register();
			}
		}
	}

	private register() {
		const { command, commandArg } = this;

		this.disposable.add(
			command
				.canExecuteCheck
				.subscribe(() => this.updateState())
		);

		if (this.useCommandShortcut && command.shortcut) {
			const manager = new CommandManager(f => {
				f();
				this.afterExecute();
			}, commandArg);

			const shortcut = new Shortcut(new ShortcutDispatcher());

			const keyDown = e => shortcut.keyDown(e);
			document.addEventListener('keydown', keyDown);

			this.disposable.add(() =>
				document.removeEventListener('keydown', keyDown)
			);

			this.disposable.add(
				shortcut.register(manager, [command])
			);
		}
	}

	private execute(e?: MouseEvent) {
		const { command, commandArg } = this;
		const result = command.execute(commandArg) === true;
		if (result && e) {
			e.preventDefault();
			e.stopPropagation();
		}

		this.afterExecute();
	}

	private afterExecute() {
		const { commandArg } = this;
		this.commandExecute.emit(commandArg);
		this.command.canExecuteCheck.next();
	}

	private unregister() {
		this.disposable.finalize();
	}

	private updateState() {
		if (!this.host.nativeElement.setAttribute) {
			return;
		}

		const { nativeElement } = this.host;
		const canExecute = this.command.canExecute(this.commandArg) === true;
		nativeElement.disabled = !canExecute;
	}
}
