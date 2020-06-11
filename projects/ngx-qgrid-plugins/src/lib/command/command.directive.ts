import {
	Directive,
	DoCheck,
	OnChanges,
	Input,
	ElementRef,
	SimpleChanges,
	OnInit,
	AfterViewInit,
} from '@angular/core';
import { Disposable, GridPlugin } from '@qgrid/ngx';
import { Command } from '@qgrid/core/command/command';

@Directive({
	selector: '[q-grid-command]',
	providers: [
		Disposable,
	]
})
export class CommandDirective implements DoCheck, OnChanges, OnInit, AfterViewInit {
	private afterViewInit = false;

	@Input('q-grid-command')
	command: Command<any>;

	@Input('q-grid-command-arg')
	commandArg: any;

	@Input('q-grid-command-event')
	commandEvent = 'click';

	constructor(
		private disposable: Disposable,
		private elementRef: ElementRef,
		private plugin: GridPlugin
	) {
	}

	ngOnInit() {
		const { nativeElement } = this.elementRef;

		nativeElement
			.addEventListener(
				this.commandEvent,
				e => this.execute(e)
			);
	}

	ngDoCheck() {
		if (!this.afterViewInit) {
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

		this.afterViewInit = true;
	}

	private register() {
		const { command, plugin } = this;
		const { commandPalette, disposable } = plugin;

		this.disposable.add(
			command
				.canExecuteCheck
				.subscribe(() => this.updateState())
		);

		if (!commandPalette.find(command.key)) {
			commandPalette.register(command);
			disposable.add(() => commandPalette.unregister(command));
		}
	}

	private execute(event?: MouseEvent) {
		const { command, commandArg } = this;
		const stopPropagate = command.execute(commandArg);
		if (event && stopPropagate === true) {
			event.preventDefault();
			event.stopPropagation();
		}
	}

	private unregister() {
		this.disposable.finalize();
	}

	private updateState() {
		const nativeElement = this.elementRef.nativeElement as HTMLElement;
		if (!nativeElement.setAttribute) {
			return;
		}

		const { command, commandArg } = this;
		const canExecute = command.canExecute(commandArg) === true;
		(nativeElement as any).disabled = !canExecute;
	}
}
