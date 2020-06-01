import {
	Directive,
	DoCheck,
	OnChanges,
	Input,
	ElementRef,
	SimpleChanges,
	OnInit,
	EventEmitter,
	Output,
	Optional,
	AfterViewInit,
	NgZone
} from '@angular/core';
import { Disposable, GridPlugin } from '@qgrid/ngx';
import { Command } from '@qgrid/core/command/command';
import { CommandManager } from '@qgrid/core/command/command.manager';
import { Shortcut } from '@qgrid/core/shortcut/shortcut';
import { ShortcutDispatcher } from '@qgrid/core/shortcut/shortcut.dispatcher';

export class ZoneCommandManager {
	constructor(
		private run: <T>(f: () => T) => T,
		private manager: CommandManager,
		private commandArg: any
	) {
	}

	invoke(commands: Command[]) {
		return this.run(() =>
			this.manager.invoke(commands, this.commandArg, 'command.directive')
		);
	}

	filter(commands) {
		return this.manager.filter(commands);
	}
}

@Directive({
	selector: '[q-grid-command]',
	providers: [Disposable]
})
export class CommandDirective implements DoCheck, OnChanges, OnInit, AfterViewInit {
	private isAfterViewInit = false;

	@Input('q-grid-command')
	command: Command<any>;

	@Input('q-grid-command-arg')
	commandArg: any;

	@Input('q-grid-command-use-shortcut')
	useCommandShortcut: boolean;

	@Input('q-grid-command-event')
	commandEvent = 'click';

	@Input('q-grid-command-use-zone')
	useZone: boolean;

	@Output('q-grid-command-execute')
	commandExecute = new EventEmitter<any>();

	@Input('q-grid-command-host')
	host: 'grid' | 'document' = 'grid';

	constructor(
		private disposable: Disposable,
		private elementRef: ElementRef,
		private zone: NgZone,
		@Optional() private plugin: GridPlugin
	) {
	}

	ngOnInit() {
		const { nativeElement } = this.elementRef;

		this.aroundZone(() =>
			nativeElement
				.addEventListener(this.commandEvent, e => this.execute(e))
		);
	}

	ngDoCheck() {
		if (!this.isAfterViewInit) {
			return;
		}

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

	ngAfterViewInit() {
		if (this.command) {
			this.updateState();
		}

		this.isAfterViewInit = true;
	}

	private register() {
		const { command, commandArg } = this;

		this.disposable.add(
			command
				.canExecuteCheck
				.subscribe(() => this.updateState())
		);

		if (this.useCommandShortcut && command.shortcut) {
			if (this.plugin && this.host === 'grid') {
				const { model } = this.plugin;
				const { shortcut, manager } = model.action();

				const zoneManager = new ZoneCommandManager(
					f => {
						const result = this.aroundZone(f);
						this.afterExecute();
						return result;
					},
					manager,
					commandArg,
				);

				this.disposable.add(
					shortcut.register(zoneManager, [command])
				);
			} else {
				const manager = new CommandManager(f => {
					this.aroundZone(f);
					this.afterExecute();
				}, commandArg);

				const shortcut = new Shortcut(new ShortcutDispatcher());

				const keyDown = e => {
					shortcut.keyDown(e);
				};

				document.addEventListener('keydown', keyDown);

				this.disposable.add(() =>
					document.removeEventListener('keydown', keyDown)
				);

				this.disposable.add(
					shortcut.register(manager, [command])
				);
			}
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
		const nativeElement = this.elementRef.nativeElement as HTMLElement;
		if (!nativeElement.setAttribute) {
			return;
		}

		const canExecute = this.command.canExecute(this.commandArg) === true;

		(nativeElement as any).disabled = !canExecute;
	}

	private aroundZone<T>(f: () => T): T {
		if (this.useZone) {
			return this.zone.run(f);
		}

		return this.zone.runOutsideAngular(f);
	}
}
