import { ElementRef, Input, Directive } from '@angular/core';
import { EventListener } from 'ng2-qgrid/core/infrastructure/event.listener';
import { EventManager } from 'ng2-qgrid/core/infrastructure/event.manager';
import { NgComponent } from 'ng2-qgrid/infrastructure/component/ng.component';
import { Popup } from './popup';

@Directive({
	selector: '[q-grid-popup-head]'
})
export class PopupHeadDirective extends NgComponent {
	@Input('q-grid-popup-head') public popup: Popup;

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
			e.dataTransfer.setDragImage(document.createElement('div'), 0, 0); // eslint-disable-line no-undef			
		}));

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
				const er = window.innerWidth - w;
				const et = 0;
				const eb = window.innerHeight - h;

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
