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
import * as Infrastructure from 'ng2-qgrid/core/infrastructure';
import { GRID_PREFIX } from 'ng2-qgrid/core/definition';
import { NgComponent } from 'ng2-qgrid/infrastructure/component/ng.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { clone, noop } from 'ng2-qgrid/core/utility';
import { DOCUMENT } from '@angular/platform-browser';
import { Model } from 'ng2-qgrid/core/infrastructure/model';

@Directive({
	selector: '[q-grid-resize]'
})
export class ResizeDirective extends NgComponent implements OnInit, OnDestroy {
	private element: HTMLElement;
	private divider: HTMLElement;
	private listener = {
		divider: Infrastructure.EventListener,
		document: Infrastructure.EventListener
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
	@Input('q-grid-drag') transfer;

	constructor(
		@Optional() private root: RootService,
		elementRef: ElementRef,
		@Inject(DOCUMENT) private document: any,
		private zone: NgZone
	) {
		super();

		this.element = elementRef.nativeElement;
		this.divider = document.createElement('div');

		this.listener.divider = new Infrastructure.EventListener(
			this.divider,
			new Infrastructure.EventManager(this)
		);
		this.listener.document = new Infrastructure.EventListener(
			document,
			new Infrastructure.EventManager(this)
		);
	}

	ngOnInit() {
		if (this.canResize(this.event())) {
			this.zone.runOutsideAngular(() => {
				this.listener.divider.on('mousedown', this.dragStart);
			});

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
		context.height = this.element.clientHeight;
		context.x = e.screenX;
		context.y = e.screenY;

		this.zone.runOutsideAngular(() => {
			this.listener.document.on('mousemove', this.drag);
			this.listener.document.on('mouseup', this.dragEnd);
		});

		const model = this.model;
		model.drag({ isActive: true });
	}

	drag(e) {
		const model = this.model;
		const context = this.context;
		const layout = model.layout;
		const state = clone(layout()[this.path]);

		state.set(this.key, {
			width: context.width + e.screenX - context.x,
			height: context.height + e.screenY - context.y
		});
		layout({ [this.path]: state });
	}

	dragEnd() {
		this.listener.document.off();

		const model = this.model;
		model.drag({ isActive: false });
	}

	event() {
		const source = this.transfer;
		return { source, target: null };
	}

	get model() {
		return this.root.model;
	}
}
