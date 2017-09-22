import { Component, ElementRef, Input } from '@angular/core';
import { EventListener } from 'ng2-qgrid/core/infrastructure/event.listener';
import { EventManager } from 'ng2-qgrid/core/infrastructure/event.manager';
import { NgComponent } from 'ng2-qgrid/infrastructure/component';
import { Popup } from './popup';

@Component({
	selector: 'q-grid-popup-head',
	templateUrl: './popup-head.component.html'
})

export class PopupHeadComponent extends NgComponent {
	@Input() public popup: Popup;

	private eventListener: EventListener;
	private element: HTMLElement;
	private position = {
		x: 0,
		y: 0
	};

	constructor(element: ElementRef) {
		super();

		this.element = element.nativeElement;
		this.element.setAttribute('draggable', 'true');
		this.eventListener = new EventListener(this.element, new EventManager(this));
	}

	ngOnInit() {
		const popup = this.popup;
		const popupElement = popup.element;

		this.using(this.eventListener.on('dragstart', e => {
			this.position.x = e.offsetX;
			this.position.y = e.offsetY;

			popupElement.classList.add('drag');
		})
		);

		this.using(this.eventListener.on('drag', event => {
			const cx = event.clientX;
			const cy = event.clientY;
			const x = this.position.x;
			const y = this.position.y;

			if (cx || cy) {
				let l = cx - x;
				let t = cy - y;
				const w = this.element.clientWidth;
				const h = this.element.clientHeight;
				const el = 0;
				const er = this.element.clientWidth - w;
				const et = 0;
				const eb = this.element.clientHeight - h;

				l = l <= el ? el : l >= er ? er : l;
				t = t <= et ? et : t >= eb ? eb : t;

				popupElement.style.left = l + 'px';
				popupElement.style.top = t + 'px';
			}
		}));

		this.using(this.eventListener.on('dragend', () => {
			this.element.classList.remove('drag');
		}));

		// this.element.body.bind('dragover', e => e.preventDefault());
	}

	ngOnDestroy(): void {
		super.ngOnDestroy();

		this.eventListener.off();
	}
}
