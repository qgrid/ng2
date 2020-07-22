import {
	Directive,
	ElementRef,
	Inject,
	Input,
	OnInit,
	NgZone
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EventListener } from '@qgrid/core/event/event.listener';
import { EventManager } from '@qgrid/core/event/event.manager';
import { GRID_PREFIX } from '@qgrid/core/definition';
import { GridPlugin } from '../plugin/grid-plugin';
import { Command } from '@qgrid/core/command/command';
import { Disposable } from '../infrastructure/disposable';

export interface ResizeArg {
	data: any;
	width: number;
	height: number;
	kind: string; // 'init' | 'resize' | 'start' | 'end';
}

@Directive({
	selector: '[q-grid-resize]',
	providers: [Disposable]
})
export class ResizeDirective implements OnInit {
	private divider: HTMLElement;

	private listener: {
		divider: EventListener,
		document: EventListener
	};

	private start = {
		x: 0,
		y: 0,
		height: 0,
		width: 0
	};

	@Input('q-grid-resize') command: Command<ResizeArg>;
	@Input('q-grid-resize-data') data: any;
	@Input('q-grid-resize-selector') selector: string;

	constructor(
		private zone: NgZone,
		private elementRef: ElementRef,
		private plugin: GridPlugin,
		disposable: Disposable,
		@Inject(DOCUMENT) document: any,
	) {
		this.divider = document.createElement('div');

		this.listener = {
			divider: new EventListener(
				this.divider,
				new EventManager(this)
			),

			document: new EventListener(
				document,
				new EventManager(this)
			)
		};

		disposable.add(() => {
			this.listener.divider.off();
			this.listener.document.off();
		});
	}

	ngOnInit() {
		const context = this.buildContext('init');
		if (this.command.canExecute(context) === true) {
			this.command.execute(context);

			this.zone.runOutsideAngular(() => {
				this.listener.divider.on('mousedown', this.dragStart);
			});

			this.divider.classList.add(`${GRID_PREFIX}-resize-handler`);
			this.elementRef.nativeElement.appendChild(this.divider);
		}
	}

	dragStart(e: DragEvent) {
		e.preventDefault();

		const { start, command } = this;
		const { model } = this.plugin;

		const host = this.select();

		start.width = host.clientWidth;
		start.height = host.clientHeight;
		start.x = e.screenX;
		start.y = e.screenY;

		const context = this.buildContext('start');
		if (command.canExecute(context) === true) {
			command.execute(context);

			this.zone.runOutsideAngular(() => {
				this.listener.document.on('mousemove', this.drag);
				this.listener.document.on('mouseup', this.dragEnd);
			});

			model.drag({
				isActive: true
			}, {
				source: 'resize.directive'
			});
		}
	}

	drag(e: MouseEvent) {
		const { command } = this;

		const context = this.buildContext('resize', e.screenX, e.screenY);
		if (command.canExecute(context) === true) {
			command.execute(context);
		}
	}

	dragEnd(e: MouseEvent) {
		this.listener.document.off();
		const { command } = this;

		const context = this.buildContext('end', e.screenX, e.screenY);
		if (command.canExecute(context) === true) {
			command.execute(context);

			const { model } = this.plugin;
			model.drag({
				isActive: false
			}, {
				source: 'resize.directive'
			});
		}
	}

	private select(): HTMLElement {
		if (this.selector === 'parent') {
			return this.elementRef.nativeElement.parentElement;
		}

		return this.elementRef.nativeElement;
	}

	private buildContext(kind: string, screenX: number = 0, screenY: number = 0) {
		const { data, start: site } = this;
		return {
			data,
			width: site.width + (screenX - site.x),
			height: site.height + (screenY - site.y),
			kind
		};
	}
}
