import {
	Directive,
	ElementRef,
	Inject,
	Input,
	OnDestroy,
	OnInit,
	Optional,
	NgZone
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { clone } from '@qgrid/core/utility/kit';
import { EventListener } from '@qgrid/core/event/event.listener';
import { EventManager } from '@qgrid/core/event/event.manager';
import { GRID_PREFIX } from '@qgrid/core/definition';
import { GridModel } from '../grid/grid-model';
import { GridPlugin } from '../plugin/grid-plugin';
import { Grid } from '../grid/grid';

@Directive({
	selector: '[q-grid-resize]'
})
export class ResizeDirective implements OnInit, OnDestroy {
	private element: HTMLElement;
	private divider: HTMLElement;

	private listener: {
		divider: EventListener,
		document: EventListener
	};

	private context = {
		x: 0,
		y: 0,
		height: 0,
		width: 0
	};

	@Input('q-grid-resize') key;
	@Input('q-grid-resize-path') path;
	@Input('q-grid-can-resize') canResize;
	@Input('q-grid-resize-selector') selector;

	constructor(
		private zone: NgZone,
		@Optional() private plugin: GridPlugin,
		private qgrid: Grid,
		@Inject(DOCUMENT) document: any,
		elementRef: ElementRef,
	) {
		this.element = elementRef.nativeElement;
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
	}

	ngOnInit() {
		const e = { data: this.key };
		if (this.canResize(e)) {
			this.zone.runOutsideAngular(() => {
				this.listener.divider.on('mousedown', this.dragStart);
			});

			this.divider.classList.add(`${GRID_PREFIX}-resize-handler`);
			this.element.appendChild(this.divider);
		}
	}

	ngOnDestroy() {
		this.listener.divider.off();
		this.listener.document.off();
	}

	dragStart(e: DragEvent) {
		e.preventDefault();

		const context = this.context;

		const host = this.select();
		context.width = host.clientWidth;
		context.height = host.clientHeight;
		context.x = e.screenX;
		context.y = e.screenY;

		this.zone.runOutsideAngular(() => {
			this.listener.document.on('mousemove', this.drag);
			this.listener.document.on('mouseup', this.dragEnd);
		});

		const model = this.model;
		model.drag({ isActive: true });
	}

	drag(e: MouseEvent) {
		const { context, path, key } = this;
		const { layout } = this.model;

		const state = clone(layout()[path]);

		state.set(key, {
			width: context.width + e.screenX - context.x,
			height: context.height + e.screenY - context.y
		});

		layout({ [path]: state });
	}

	dragEnd() {
		this.listener.document.off();

		const model = this.model;
		model.drag({ isActive: false });
	}

	private select(): HTMLElement {
		if (this.selector === 'parent') {
			return this.element.parentElement;
		}

		return this.element;
	}

	private get model(): GridModel {
		return this.plugin.model;
	}
}
