import {Directive, ElementRef, Inject, Input, Optional} from '@angular/core';
import {EventManager} from '@grid/core/infrastructure';
import {EventListener} from '@grid/core/infrastructure/event.listener';
import {GRID_PREFIX} from '@grid/core/definition';
import {NgComponent, RootService} from '@grid/infrastructure/component';
import {clone, noop} from '@grid/core/utility';
import {DOCUMENT} from '@angular/platform-browser';

@Directive({
	selector: '[q-grid-resize]'
})
export class ResizeDirective extends NgComponent {
	private element: HTMLElement;
	private divider: HTMLElement;
	private listener = {
		divider: EventListener,
		document: EventListener
	};
	private context = {
		x: 0,
		width: 0
	};

	@Input('q-grid-resize') key;
	@Input('q-grid-resize-path') path;
	@Input('q-grid-can-resize') canResize;
	@Input('q-grid-drag') transfer;

	constructor(@Optional() private root: RootService, elementRef: ElementRef, @Inject(DOCUMENT) private document: any) {
		super();

		this.element = elementRef.nativeElement;
		this.divider = document.createElement('div');

		this.listener.divider = new EventListener(this.divider, new EventManager(this));
		this.listener.document = new EventListener(document, new EventManager(this));
	}

	ngOnInit() {
		if (this.canResize(this.event())) {
			this.listener.divider.on('mousedown', this.dragStart);
			this.divider.classList.add(`${GRID_PREFIX}-divider`);
			this.element.appendChild(this.divider);
		}
	}

	ngOnDestroy() {
		super.ngOnDestroy();

		this.listener.divider.off();
		this.listener.document.off();
	}

	dragStart(e) {
		e.preventDefault();

		const context = this.context;
		context.width = this.element.clientWidth;
		context.x = e.screenX;

		this.listener.document.on('mousemove', this.drag);
		this.listener.document.on('mouseup', this.dragEnd);

		const model = this.model;
		model.drag({isActive: true});
	}

	drag(e) {
		const model = this.model;
		const context = this.context;
		const layout = model.layout;
		const state = clone(layout()[this.path]);

		state[this.key] = {width: context.width + e.screenX - context.x};
		layout({[this.path]: state});
	}

	dragEnd() {
		this.listener.document.off();

		const model = this.model;
		model.drag({isActive: false});
	}

	event() {
		const source = this.transfer;
		return {
			source: source,
			target: null
		};
	}

	get model() {
		return this.root.model;
	}
}
