import {Component, Input, ElementRef, OnInit, OnDestroy, ViewContainerRef} from '@angular/core';
import {TemplateLink} from '';
import {EventListener} from 'ng2-qgrid/core/infrastructure/event.listener';
import {EventManager} from 'ng2-qgrid/core/infrastructure/event.manager';
import {PopupService} from 'ng2-qgrid/plugins/popup/popup.service';
import {TemplateCacheService, TemplateLinkService} from 'ng2-qgrid/template';
import {NgComponent} from 'ng2-qgrid/infrastructure/component';

@Component({
	selector: 'q-grid-popup-head',
	template: '<div></div>'
})

export class PopupHeadComponent extends NgComponent {
	@Input() model;
	@Input() id;
	@Input() popup;

	private eventListener: EventListener;
	private position = {
		x: 0,
		y: 0
	};
	private template;

	constructor(private qGridPopupService: PopupService,
					private element: ElementRef,
					private viewContainerRef: ViewContainerRef,
					private templateLink: TemplateLinkService,
					private templateCache: TemplateCacheService) {
		super();

		this.template = new TemplateLink();
		this.eventListener = new EventListener(this.element.nativeElement[0], new EventManager(this));

		this.element = this.element.nativeElement.setAttribute('draggable', true);
	}

	ngOnInit() {
		const popup = this.popup;
		const popupElement = popup.element;
		const model = this.model;
		const templateUrl = 'qgrid.plugin.popup-head.tpl.html';
		const template =
			this.templateCache.get(templateUrl) ||
			this.templateLink.get(templateUrl);

		this.viewContainerRef.createEmbeddedView(template, this);

		// const link = this.template.link(
		//   templateUrl,
		//   model.popup().resource,
		//   [`${this.id}:head`]
		// );

		this.using(this.eventListener.on('dragstart', e => {
			this.position.x = e.offsetX;
			this.position.y = e.offsetY;

			popupElement.addClass('drag');
			e.dataTransfer.setDragImage(
				this.element.nativeElement.document.getElementsByTagName('<div>')[0], 0, 0); // eslint-disable-line no-undef
		}));

		this.using(this.eventListener.on('drag', event => {
			const cx = event.clientX;
			const cy = event.clientY;
			const x = this.position.x;
			const y = this.position.y;

			if (cx || cy) {
				let l = cx - x;
				let t = cy - y;
				const w = this.element.nativeElement.clientWidth;
				const h = this.element.nativeElement.clientHeight;
				const el = 0;
				const er = this.element.nativeElement.innerWidth - w;
				const et = 0;
				const eb = this.element.nativeElement.innerHeight - h;

				l = l <= el ? el : l >= er ? er : l;
				t = t <= et ? et : t >= eb ? eb : t;

				popupElement.css('left', l + 'px');
				popupElement.css('top', t + 'px');
			}
		}));

		this.using(this.eventListener.on('dragend', () => {
			this.element.nativeElement.removeClass('drag');
		}));

		this.element.nativeElement.body.bind('dragover', this.onDragOver);
	}

	private onDragOver(e: Event): void {
		e.preventDefault();
	}

	ngOnDestroy(): void {
		super.ngOnDestroy();

		this.element.nativeElement.document.body.unbind('dragover', this.onDragOver);
	}
}
